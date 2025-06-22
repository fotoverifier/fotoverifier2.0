'use client';
import React, { useEffect, useState, Suspense, useRef, act } from 'react';
import { Inter, Merriweather, Montserrat } from 'next/font/google';
import styles from '@/app/(single layout)/result/res.module.css';
import Tabs from '@/components/tab/step_tab';
import Image from 'next/image';
import { ExifData, SearchResult } from '@/interface/interface';
import { useSearchParams } from 'next/navigation';
import Image_Result from './technique/image';
import JpegGhostResult from './technique/jpegGhost';
import ElaResult from './technique/ela';
import { BiSolidCategory } from 'react-icons/bi';
import HeaderReport from '@/components/head/head_result';
import { TabProvider } from '@/context/tabContext';
import FakeShieldApp from './technique/fakeshieldapi';
import LocationSection from './technique/locationSection';
import MetaDataPage from './technique/metadata';
import { useLanguage } from '@/context/LanguageContext';
import ImageSuperResolution_2 from './technique/image_ss_copy/image_ss';
import { useImageUpload } from '@/context/imageUploadContext';
import ExifImageDetails from './originality';
import TestData from '@/terminologies/test_AI.json';
import { AnalysisResult } from '@/interface/interface';

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });
const merriweather = Merriweather({ subsets: ['latin'], weight: '700' });
const Res = () => {
  const searchParams = useSearchParams();
  const img = searchParams.get('image');
  const taskId = searchParams.get('task_id');
  const { file, previewUrl } = useImageUpload();

  const [results, setResults] = useState<any[]>([]);

  const [exifResult, setExifResult] = useState<ExifData | null>(null);
  const [tagResult, setTagResult] = useState<string | null>(null);
  const [elaResult, setElaResult] = useState<string | null>(null);
  const [jpegGhostResult, setJpegGhostResult] = useState<string[] | null>(null);
  const [superResolutionResult, setSuperResolutionResult] = useState<
    string | null
  >(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );

  const [loadingExifCheck, setLoadingExifCheck] = useState<boolean>(true);

  const [loadingTagResult, setLoadingTagResult] = useState<boolean>(true);
  const [loadingEla, setLoadingEla] = useState<boolean>(true);
  const [loadingJpegGhost, setLoadingJpegGhost] = useState<boolean>(true);
  const [loadingSuperResolution, setLoadingSuperResolution] =
    useState<boolean>(false);

  const { t } = useLanguage();

  //const [loadingAI, setLoadingAI] = useState<boolean>(true);
  // const [AIsubmitted, setAISubmitted] = useState(false);

  //In order to test the AI result
  const [loadingAI, setLoadingAI] = useState<boolean>(false);
  const [AIsubmitted, setAISubmitted] = useState(true);

  useEffect(() => {
    if (!img || !taskId) return;

    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/quick-scan-stream/?task_id=${taskId}`
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received:', data);

        if (data.status === 'done') {
          console.log('All tasks completed. Closing SSE...');
          eventSource.close();
          setAnalysisResult(TestData); //Comment this line if you don't want to test anymore
          return;
        }

        if (!data?.result?.result?.method) {
          console.warn('Unexpected SSE data format:', data);
          return; 
        }

        switch (data.result.result.method) {
          case 'exif':
            setExifResult(data.result.result.exif_data);
            setLoadingExifCheck(false);
            break;
          case 'jpeg_ghost':
            setJpegGhostResult(data.result.result.jpeg_ghost);
            setLoadingJpegGhost(false);
            break;
          case 'ram':
            setTagResult(data.result.result.recognized_objects);
            setLoadingTagResult(false);
            break;
          case 'ela':
            setElaResult(data.result.result.ela_image);
            setLoadingEla(false);
            break;
          default:
            console.warn('Unknown task received:', data.task);
        }

        setResults((prevResults) => [...prevResults, data]);
      } catch (error) {
        console.error('Error parsing SSE data:', error);
      }
    };

    eventSource.onerror = (error) => {
      if (
        eventSource.readyState === EventSource.CLOSED ||
        eventSource.readyState == 0
      )
        return; // Skip if connection is closed
      else console.error('SSE connection error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleEnhance = async (upscaleFactor: string) => {
    if (!file) return;

    try {
      setLoadingSuperResolution(true);
      setSuperResolutionResult(null);

      const formData = new FormData();
      formData.append('file', file);

      const scale = parseInt(upscaleFactor.replace('x', ''), 10);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/super-resolution?scale=${scale}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const { task_id } = await res.json();

      const eventSource = new EventSource(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/super-resolution-stream/?task_id=${task_id}&scale=${scale}`
      );

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.status === 'done' && data.image_url) {
          setSuperResolutionResult(data.image_url);
          setLoadingSuperResolution(false);
          eventSource.close();
        } else if (data.status === 'error') {
          console.error(data.detail);
          setLoadingSuperResolution(false);
          eventSource.close();
        }
      };

      eventSource.onerror = (err) => {
        console.error('SSE Error', err);
      };
    } catch (error) {
      console.error('Enhancement failed:', error);
      setLoadingSuperResolution(false);
    }
  };

  const handleAISubmit = async (
    insight: string,
    selectedSuggestion: 'professional' | 'casual' | null,
    selectedLanguage: 'EN' | 'VN' | 'NO' | 'JP' | null
  ) => {
    console.log(file);
    if (!file || !elaResult || !selectedSuggestion || !selectedLanguage) {
      console.log(elaResult);
      console.error('Missing required input(s)');
      return;
    }
    setAISubmitted(true);
    setLoadingAI(true);
    const formData = new FormData();
    formData.append('original', file); // `img` should be a File object
    formData.append('ela_url', elaResult); // `elaResult` should be a URL string
    formData.append('question', insight);
    formData.append('suggestion', selectedSuggestion || 'professional'); // fallback if null
    formData.append('language', selectedLanguage || 'EN');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ai-validation`,
        {
          method: 'POST',
          body: formData,
        }
      );
      setLoadingAI(false);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.detail || 'AI validation failed');
      }
      console.log('AI validation result:', result);
      setAnalysisResult(result.analysis);
    } catch (err) {
      console.error('Submission failed:', err);
      setLoadingAI(false);
    }
  };

  const renderContent = (activeTab: string) => {
    const tabData = {
      Tampering: (
        <div className={`h-full w-full ${styles.striped_background}`}>
          <div className={styles.Seven_content_container}>
            <div id="img" className={styles.Result_container}>
              <Image_Result img={img} key={img} />
            </div>
            <div id="jpeg_ghost" className={styles.Result_container}>
              <JpegGhostResult
                images={jpegGhostResult}
                loading={loadingJpegGhost}
              />
            </div>
            <div id="ela" className={styles.Result_container}>
              <ElaResult img={elaResult} loading={loadingEla} />
            </div>
          </div>
        </div>
      ),
      Superesolution: (
        <div className={`h-full w-full`}>
          <ImageSuperResolution_2
            previewUrl={previewUrl}
            handleEnhance={handleEnhance}
            superResolutionResult={superResolutionResult}
            loading={loadingSuperResolution}
          />
        </div>
      ),
      AI_Investigators: (
        <div className="w-full h-full">
          <FakeShieldApp
            img={img}
            img2={elaResult}
            submitted={AIsubmitted}
            analysisResult={analysisResult}
            handleSubmit={handleAISubmit}
            loading={loadingAI}
          ></FakeShieldApp>
        </div>
      ),
      OtherTabs: [
        {
          key: 'Originality',
          title: t('Originality'),
          description: t('Author_Information_Description'),
          content: (
            <ExifImageDetails
              exifResult={exifResult}
              tagResult={tagResult}
              loadingTagResult={loadingTagResult}
              //  SearchResult={SearchResult}
              //  loadingReverseImageSearch={loadingReverseImageSearch}
            />
          ),
        },
        {
          key: 'Location',
          title: t('Location'),
          description: t('GPS_Location_Description'),
          content: <LocationSection exifResult={exifResult}></LocationSection>,
        },
      ],
    };

    if (activeTab === 'Tampering Detection') {
      return tabData.Tampering;
    } else {
      const selectedTab = tabData.OtherTabs.find(
        (tab) => tab.key === activeTab
      );

      if (activeTab === 'Superesolution') {
        return tabData.Superesolution;
      }

      if (activeTab === 'AI_Investigators') {
        return tabData.AI_Investigators;
      }

      if (selectedTab) {
        return (
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.circleWrapper}>
                <div className="p-2 rounded-full border-2">
                  <BiSolidCategory />
                </div>
                <div className="w-full flex justify-center">
                  <div className={`${styles.title} ${inter.className}`}>
                    {selectedTab.title}
                  </div>
                </div>
              </div>
              <div className={`${styles.description} flex items-center`}>
                {selectedTab.description}
                {(() => {
                  switch (selectedTab.title) {
                    case t('Originality'):
                      return (
                        <div className="ml-auto">
                          {' '}
                          <MetaDataPage
                            cameraInformation={exifResult?.camera_information}
                            software_modify={exifResult?.software_modify}
                            modify_date={exifResult?.modify_date}
                            original_date={exifResult?.original_date}
                            author_copyright={exifResult?.author_copyright}
                            gps_location={exifResult?.gps_location}
                            loading={false}
                          ></MetaDataPage>
                        </div>
                      );
                    default:
                      return null;
                  }
                })()}
              </div>
            </div>
            <div className={styles.content}>{selectedTab.content}</div>
          </div>
        );
      }
    }

    return <div className="h-full w-full">No content available.</div>;
  };

  return (
    <TabProvider>
      <div className={styles.res_container}>
        <HeaderReport
          elaResult={elaResult}
          tagResult={tagResult}
          loadingEla={loadingEla}
          loadingJpegGhost={loadingJpegGhost}
          loadingTagResult={loadingTagResult}
        />
        <div
          className={` ${styles.res_body_container} ${merriweather.className}`}
        >
          <Tabs renderContent={renderContent} />
        </div>
      </div>
    </TabProvider>
  );
};

export default Res;

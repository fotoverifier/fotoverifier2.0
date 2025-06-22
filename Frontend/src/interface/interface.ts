export interface ExifData {
  exif_data: any;
  software_modify: string | undefined;
  modify_date: string | undefined;
  original_date: {
    original_date: string | undefined;
    create_date: string | undefined;
  };
  camera_information: {
    make: string | undefined;
    model: string | undefined;
    exposure: string | undefined;
    aperture: string | undefined;
    focal_length: string | undefined;
    iso_speed: string | undefined;
    flash: string | undefined;
    camera_image: {
      image_url: string;
    };
  };
  gps_location: {
    latitude: string | null;
    longitude: string | null;
  };
  author_copyright: {
    author: string | undefined;
    copyright_tag: string | undefined;
    profile_copyright: string | undefined;
    author_image: {
      image_results: {
        original: string;
      }[];
    };
  };
}

export interface SearchResult {
  title: string | undefined;
  redirect_link: string | undefined;
}

export interface Result {
  exif_data: any;
  jpeg_ghost_result: string;
  reverse_image_search_results: any;
}

export interface Tagging {
  tag: string;
}

export interface AI_Validation {
  img: string | null;
  img2: string | null;
  submitted: boolean;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface InvestigatorResult {
  Summary: string;
  'Lighting inconsistencies': string;
  'Edge artifacts': string;
  'Semantic anomalies': string;
  'Political Relevancy': string;
  'Confidence level': string;
  Where: string;
  When: string;
  Who: string;
  Why: string;
}

export interface SharedJudgment {
  'Consensus Summary': string;
  'Political Relevancy (agreed)': string;
  'Overall Confidence': string;
}

export interface UserQuestionResponse {
  Relevance: string;
  Response?: string;
}

export interface AnalysisResult {
  investigator_A: InvestigatorResult;
  investigator_B: InvestigatorResult;
  shared_judgment: SharedJudgment;
  user_question_response: UserQuestionResponse;
}

export type CFAMethod = 'Menon' | 'Malvar';
export type DenoiseMethod = 'Bilateral' | 'Non-Local Means';
export type EdgeMethod = 'Canny' | 'Marr-Hildreth';

export interface ComputerVisionAlgoResult {
  Denoise: Record<DenoiseMethod, string | null>;
  Edge: Record<EdgeMethod, string | null>;
  CFA: Record<CFAMethod, string | null>;
}
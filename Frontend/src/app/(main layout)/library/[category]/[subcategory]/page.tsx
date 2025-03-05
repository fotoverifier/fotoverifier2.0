'use client';
import { useParams } from 'next/navigation';

export default function SubcategoryPage() {
  const params = useParams();
  const subcategory = Array.isArray(params.subcategory)
    ? params.subcategory[0]
    : params.subcategory;
  const formattedSubcategory = subcategory
    ? subcategory.replace(/_/g, ' ')
    : 'Unknown Subcategory';

  return (
    <div className="max-full mx-auto p-6 h-full bg-white">
      <section className="mb-8 p-4 border-2 border-[#03564a] rounded-lg">
        <h1 className="p-2 border-2 rounded-full border-[#03564a] w-fit text-3xl font-bold text-[#03564a]">
          {formattedSubcategory}
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          This section introduces the topic{' '}
          <strong>{formattedSubcategory}</strong> and provides a brief overview
          of its significance.
        </p>
      </section>

      {/* Divider line */}
      <hr className="border-t-2 border-[#03564a] my-8" />

      {/* Section 2: Methodology */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-[#03564a]">Methodology</h2>
        <p className="text-gray-700 mt-2">
          In this section, we discuss the methods and approaches used to analyze
          the topic. Detailed steps, procedures, and techniques are outlined to
          ensure a rigorous examination of the subject matter.
        </p>
      </section>

      {/* Divider line */}
      <hr className="border-t-2 border-[#03564a] my-8" />

      {/* Section 3: Paper - Related Work */}
      <section>
        <h2 className="text-2xl font-bold text-[#03564a]">
          Paper - Related Work
        </h2>
        <p className="text-gray-700 mt-2">
          This section reviews relevant literature and related studies that have
          contributed to our understanding of{' '}
          <strong>{formattedSubcategory}</strong>. Key findings from previous
          research and academic papers are summarized here.
        </p>
      </section>
    </div>
  );
}

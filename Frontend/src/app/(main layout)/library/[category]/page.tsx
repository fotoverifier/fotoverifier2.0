'use client';
import { useParams, useRouter } from 'next/navigation';

const categories = [
  {
    name: 'Meta-data Analysis',
    slug: 'meta_data_analysis',
    subcategories: ['EXIF Data'],
  },
  {
    name: 'Computational  Photography',
    slug: 'computational_photography',
    subcategories: ['Lesson 3', 'Lesson 4'],
  },
  {
    name: 'Tampering Detection',
    slug: 'tampering_detection',
    subcategories: ['JPEG Ghost, ELA'],
  },
  {
    name: 'Optical/Physical',
    slug: 'optical_physical',
    subcategories: [],
  },
];

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const category = categories.find((c) => c.slug === params.category);

  if (!category) return <div className="text-red-500">Category not found.</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{category.name}</h1>
      <div className="text-gray-600">
        Explore forensic techniques in this category.
      </div>

      {category.subcategories.length > 0 && (
        <ul className="mt-4">
          {category.subcategories.map((subcategory) => {
            const targetUrl = `/library/${category.slug}/${subcategory.toLowerCase().replace(/\s+/g, '_')}`;
            console.log(`Navigating to: ${targetUrl}`);
            return (
              <li key={subcategory}>
                <div
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    try {
                      router.push(targetUrl);
                      console.log('Navigation attempted successfully');
                    } catch (error) {
                      console.error('Navigation failed:', error);
                    }
                  }}
                >
                  {subcategory}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

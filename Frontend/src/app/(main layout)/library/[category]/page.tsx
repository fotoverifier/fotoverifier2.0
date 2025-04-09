'use client';
import { useParams, useRouter } from 'next/navigation';

const categories = [
  {
    name: 'Meta-data Analysis',
    slug: 'meta-data_analysis',
    subcategories: ['JPEG Ghost', 'EXIF Data'],
  },
  {
    name: 'Computational  Photography',
    slug: 'computational_photography',
    subcategories: ['Lesson 3', 'Lesson 4'],
  },
  {
    name: 'Tampering Detection',
    slug: 'tampering_detection',
    subcategories: [],
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
          {category.subcategories.map((subcategory) => (
            <li key={subcategory}>
              <div
                className="text-blue-600 hover:underline"
                onClick={() =>
                  router.push(
                    `/library/${category.slug}/${subcategory.toLowerCase().replace(/\s+/g, '_')}`
                  )
                }
              >
                {subcategory}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

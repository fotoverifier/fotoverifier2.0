"use client";
import { useParams } from "next/navigation";

export default function SubcategoryPage() {
  const params = useParams();
  const subcategory = Array.isArray(params.subcategory) ? params.subcategory[0] : params.subcategory;
  const formattedSubcategory = subcategory ? subcategory.replace(/_/g, " ") : "Unknown Subcategory";

  return (
    <div>
      <h1 className="text-2xl font-bold">{formattedSubcategory}</h1>
      <div className="text-gray-600">Detailed content about &quot;{formattedSubcategory}&quot;.</div>
    </div>
  );
}

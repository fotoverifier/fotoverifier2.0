import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const submitRating = async (text_rating: number, image_rating: string) => {
  const { data, error } = await supabase.from('rating').insert([{ text_rating, image_rating }]);

  if (error) {
    console.error('Error submitting rating:', error);
    return false;
  }

  return true;
};

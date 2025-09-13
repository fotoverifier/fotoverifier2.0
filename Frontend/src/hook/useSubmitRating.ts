export const submitRating = async (text_rating: number, image_rating: string) => {
  const res = await fetch('/api/rating', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text_rating, image_rating }),
  });

  return res.ok;
};

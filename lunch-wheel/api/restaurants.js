export default async function handler(req, res) {
  const { lat, lng } = req.query;

  const response = await fetch(
    `https://api.foursquare.com/v3/places/search?ll=${lat},${lng}&radius=1200&limit=20&fields=name,location,distance,rating,photos`,
    {
      headers: {
        Authorization: process.env.FOURSQUARE_KEY
      }
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
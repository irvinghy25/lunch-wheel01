export default async function handler(req, res) {

  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Missing coordinates" });
  }

  try {

    const url =
`https://api.foursquare.com/v3/places/search?ll=${lat},${lng}&radius=3000&limit=20&fields=fsq_id,name,location,distance,rating,photos`;

    const response = await fetch(url,{
      headers:{
        Authorization: process.env.FOURSQUARE_KEY01,
        Accept: "application/json"
      }
    });

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {

    res.status(500).json({
      error: "Foursquare request failed",
      detail: error.message
    });

  }

}


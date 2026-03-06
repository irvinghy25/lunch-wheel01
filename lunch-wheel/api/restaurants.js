export default async function handler(req, res) {

const { lat, lng } = req.query || {};

if (!lat || !lng) {
return res.status(400).json({ error: "Missing coordinates" });
}

try {

const url =
`https://api.foursquare.com/v3/places/search?ll=${lat},${lng}&radius=3000&limit=50&categories=13065&fields=fsq_id,name,location,distance,rating,photos`;

const response = await fetch(url,{
headers:{
Authorization:`Bearer ${process.env.FOURSQUARE_KEY}`,
Accept:"application/json"
}
});

if(!response.ok){
throw new Error("Foursquare error "+response.status)
}

const data = await response.json()

res.status(200).json(data)

}catch(error){

res.status(500).json({
error:"Foursquare request failed",
detail:error.message
})

}

}

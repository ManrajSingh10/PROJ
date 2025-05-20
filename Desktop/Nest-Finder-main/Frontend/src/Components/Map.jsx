// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';

// const MapPage = ({ property }) => {
//   const [location, setLocation] = useState(null);
  
//   // Construct the URL with the property data
//   const url = `https://nominatim.openstreetmap.org/search.php?street=${encodeURIComponent(property.address)}&city=${encodeURIComponent(property.city)}&state=${encodeURIComponent(property.state)}&country=${encodeURIComponent(property.country || "US")}&format=jsonv2`;

//   // Fetch location coordinates
//   useEffect(() => {
//     const fetchCoordinates = async () => {
//       try {
//         const response = await axios.get(url);
//         if (response.data && response.data.length > 0) {
//           const loc = response.data[0];
//           setLocation(loc);
//         }
//       } catch (error) {
//         console.error("Error fetching coordinates:", error);
//       }
//     };
//     fetchCoordinates();
//   }, [url]);

//   // If no location data is fetched, return a loading state or null
//   if (!location) {
//     return <div className="text-center text-lg">Loading map...</div>;
//   }

//   const { lat, lon, display_name } = location;

//   return (
//     <div className="p-4 w-full">
//       {/* Property details (You can add this if required) */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold">
//           {property.address}, {property.neighborhood}, {property.city}, {property.state}
//         </h1>
//         {/* <p className="text-lg">{property.propType} for {property.listingType}</p> */}
//         <p></p>
//         <p>{property.country}</p>
//       </div>

//       {/* Map container */}
//       <div className="relative w-full h-[50vh] md:w-[50vw] md:h-[50vh] mx-auto">
//         <MapContainer
//           center={[parseFloat(lat), parseFloat(lon)]}
//           zoom={15}
//           scrollWheelZoom={false}
//           className="w-full h-full"
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           <Marker position={[parseFloat(lat), parseFloat(lon)]}>
//             <Popup>
//               <b>Location:</b><br />
//               {display_name}
//             </Popup>
//           </Marker>
//         </MapContainer>
//       </div>
//     </div>
//   );
// };

// export default MapPage;


import React from 'react'

function Map() {
  return (
    <div>Map</div>
  )
}

export default Map
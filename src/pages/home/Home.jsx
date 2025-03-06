import { useState, useEffect } from 'react';
import './home.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Flow Button Component
const FlowButton = ({ id, onClick }) => {
  return (
    <button
      id={id}
      className="flow-button"
      style={{
        padding: '15px 30px',
        margin: '8px',
        backgroundColor: '#f0f0f0',
        border: '2px solid #ccc',
        cursor: 'pointer',
        transition: '0.3s',
        color: 'black',
        fontSize: '18px',
        fontWeight: 'bold',
        borderRadius: '7px',
      }}
      onClick={() => onClick(id)}
    >
      {id.replace(/_/g, ' ')}
    </button>
  );
};

const UpdateMapView = ({ coords }) => {
  const map = useMap();
  map.setView(coords, 18);
  return null;
};

// Flow Component (Renders Buttons)
const Flow = ({ title, blocks }) => {
  const handleButtonClick = (id) => {
    console.log(`Button Clicked: ${id}`);
  };

  return (
    <div className="flow">
      <h3 style={{ color: 'white' }}>{title}</h3>
      <div style={{ display: 'flex', color: 'black', flexDirection: 'column', alignItems: 'flex-start' }}>
        {blocks.map((blockId, index) => (
          <FlowButton key={`${blockId}-${index}`} id={blockId} onClick={handleButtonClick} />
        ))}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [latitude, setLatitude] = useState(51.505);
  const [longitude, setLongitude] = useState(-0.09);

  useEffect(() => {
    const fetchGPSData = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude.toFixed(6));
            setLongitude(position.coords.longitude.toFixed(6));
          },
          (error) => console.error("Error getting location:", error),
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      }
    };

    const interval = setInterval(fetchGPSData, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
        {/* Top Section: Camera Feed & Buttons Side by Side */}
        {/* Camera Feed */}
        <div
          className="graph"
          style={{
            width: '600px',
            height: '256px',
            backgroundColor: 'lightgray',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black'
          }}
        >
          <p>Camera Feed</p>
        </div>
        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
          <Flow title="Launch Sequence" blocks={['Start', 'Boost', 'Launch Wait']} />
          <Flow title="Payload Deployment" blocks={['Payload Realease', 'End']} />
        </div>
      </div>
      {/* Bottom Section: Map Image */}
      {/* Bottom Section: Map Display */}
      <div className="map-gps-container" style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '20px', color: 'black' }}>
        <div className="map-container">
          <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: "282px", width: "600px" }} scrollWheelZoom={false}>
            <UpdateMapView coords={[latitude, longitude]} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[latitude, longitude]}>
              <Popup>
                <b>Current Location</b><br />
                Latitude: {latitude} <br />
                Longitude: {longitude}
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="gps-info"
          style={{
            backgroundColor: '#f8f9fa', // Light gray background
            padding: '10px 15px',
            borderRadius: '10px',
            boxShadow: '2px 2px 10px rgba(0,0,0,0.1)', // Soft shadow
            // textAlign: 'center',
            fontSize: '30px', 
            fontWeight: 'bold',
            color: '#333', // Dark text
            // width: '250px', // Fixed width
            margin: '10px auto' // Center align
          }}>
          <p style={{ margin: '5px 0' }}><span /*style={{ color: '#007BFF' }}*/>Latitude:</span> {latitude ?? "Loading..."}</p>
          <p style={{ margin: '5px 0' }}><span /*style={{ color: '#28A745' }}*/>Longitude:</span> {longitude ?? "Loading..."}</p>
        </div>

      </div>
    </div>

  );
};

export default App;

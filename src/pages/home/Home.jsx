import './home.css';
import mapImage from "../../assets/Maps.png";

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
        borderRadius: '20px',
      }}
      onClick={() => onClick(id)}
    >
      {id.replace(/_/g, ' ')}
    </button>
  );
};

// Flow Component (Renders Buttons)
const Flow = ({ title, blocks }) => {
  const handleButtonClick = (id) => {
    console.log(`Button Clicked: ${id}`);
  };

  return (
    <div className="flow">
      <h3 style={{ color: 'black' }}>{title}</h3>
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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      {/* Top Section: Camera Feed & Buttons Side by Side */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '35px', alignItems: 'flex-start' }}>
        {/* Camera Feed */}
        <div
          className="graph"
          style={{
            width: '600px',
            height: '300px',
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
          <Flow title="Launch Sequence" blocks={['boost', 'launch_wait', 'ascent', 'software_start']} />
          <Flow title="Payload Deployment" blocks={['boost2', 'payload_release', 'end']} />
        </div>
      </div>
      {/* Bottom Section: Map Image */}
      <div className='graph'>
        <img
          src={mapImage}
          alt="Graph"
          style={{ width: '400px', height: '200px', margin: '15px',marginRight:'675px',marginTop:'-10px' }}
        />
      </div>
    </div>
  );
};

export default App;

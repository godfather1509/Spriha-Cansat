// import "./maps.css";
import mapImage from "../../assets/Maps.png";

const App = () => {
  return (
    <div>
      <div className='graph'>
        <img 
          src={mapImage}
          alt="Graph" 
          style={{ width: '600px', height: '300px', margin: '15px' }} 
        />
      </div>
    </div>
  );
};

export default App;

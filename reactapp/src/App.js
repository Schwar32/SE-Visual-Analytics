import "./styles/App.css";
import BirdContainer from "./components/BirdContainer";
import Navbar from "./components/Navbar";
import AddBirdContainer from "./components/AddBirdContainer";

function App() {
  return (
    <div>
      <Navbar />
      
        
        <div className="container-fluid ">
          <div className="row justify-content-center">
            
              <BirdContainer />
              <BirdContainer />
            
          </div>
        </div>
      
    </div>
  );
}

export default App;

import "./styles/App.css";
import "react-h5-audio-player/lib/styles.css";
import BirdContainer from "./components/BirdContainer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container-xl p-5 ">
        <div className="row justify-content-center ">
          <BirdContainer className="col" />
          <BirdContainer className="col" />
        </div>
      </div>
    </div>
  );
}

export default App;

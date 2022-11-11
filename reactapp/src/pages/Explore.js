import "../styles/App.css";
import BirdContainer from "../components/BirdContainer";

function Explore() {
  return (
    <div>
      <div className="container-fluid ">
        <div className="row justify-content-center">
          <BirdContainer container={1} />
        </div>
      </div>
    </div>
  );
}

export default Explore;

import "../styles/App.css";
import BirdContainer from "../components/BirdContainer";
import NavBar from "../components/Navbar";
function Explore() {
  return (
    <div>
      <NavBar />
      <div className="container-fluid ">
        <div className="row justify-content-center">
          <BirdContainer container={1} />
          <BirdContainer container={2} />
        </div>
      </div>
    </div>
  );
}

export default Explore;

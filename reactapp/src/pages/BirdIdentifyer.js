import "../styles/App.css";
import NavBar from "../components/Navbar";

function BirdIdentifyer() {
  return (
    <div>
      <NavBar />
      <div className="container-fluid ">
        <div className="row justify-content-center">
          <p className="py-5">The machine learning side</p>
        </div>
      </div>
    </div>
  );
}

export default BirdIdentifyer;

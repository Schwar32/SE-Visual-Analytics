import "../styles/App.css";
import "../styles/Identify.css";
import NavBar from "../components/Navbar";

function BirdIdentifyer() {
  return (
    <div>
      <NavBar />
          <div className="container">
            <div className="flexbox-item item-1"> 
              <div className="item-1-header">
                <h3><b>Welcome to Bird Identifier</b></h3>
              </div>
              <div className="item-1-body"> 
                <p>Submit a bird call and watch our neural network guess your bird in real time!</p>
              </div>
              <div className="item-1-button">
                Submit
              </div>
            </div>
          </div>
        </div>
  );
}

export default BirdIdentifyer;

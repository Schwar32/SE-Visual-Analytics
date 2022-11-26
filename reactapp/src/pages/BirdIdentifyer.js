import "../styles/App.css";
import "../styles/Identify.css";
import NavBar from "../components/Navbar";
import { useState } from "react";

/* FUNCTIONALITY OF SUBMIT

-After clicking the submit button
-Add a new Results class which has the same container type as item-1
-Space those two evenly on the page.

*/


function BirdIdentifyer() {
  const [result, setResults] = useState(false);
  const [old, setDelete] =useState(true);
  const state=false;
  function addResults (e) {
      setResults(!result);
      e.target.className = "item-1-button";
      setDelete(!old);
      e.target.className = "flexbox-item item-1";
      if(result) {
        e.target.className += "item-1-button-selected";
      }
  }  
  return (
    <div>
      <NavBar />
            {old && (         
              <div className="container"> 
              <div className="flexbox-item item-1"> 
                <div className="item-1-header">
                  <h3><b>Welcome to Bird Identifier</b></h3>
                </div>
                <div className="item-1-body"> 
                  <p>Submit a bird call and watch our neural network guess your bird in real time!</p>
                </div>
                <div className="item-1-button" onClick={addResults}>
                  Submit
                </div>
              </div>
              </div>
            )}
  
            {result && (
              <div className="container">
                <div className="flexbox-item item-1"> 
                  <div className="item-1-header">
                    <h3><b>Additional Model Insights</b></h3>
                  </div>
                  <div className="item-1-body"> 
                    <p>Model guess duration: test<br></br>
                      Bird is: test</p>
                  </div>
                  <div className="item-1-button" onClick={addResults}>
                    Submit Again
                  </div>
                </div>
                <div className="flexbox-item item-2"> 
                  <div className="item-1-header">
                    <h3><b>The Results Are In</b></h3>
                  </div>
                  <div className="item-1-body"> 
                    <p>90% : test data<br></br>
                       65% : test data<br></br>
                            ...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
  );
}

export default BirdIdentifyer;

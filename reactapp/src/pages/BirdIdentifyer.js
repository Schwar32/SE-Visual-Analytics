import "../styles/App.css";
import "../styles/Identify.css";
import NavBar from "../components/Navbar";
import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

/* FUNCTIONALITY OF SUBMIT

-After clicking the submit button
-Add a new Results class which has the same container type as item-1
-Space those two evenly on the page.

*/

function BirdIdentifyer() {
  const [result, setResults] = useState(false);
  const [old, setDelete] = useState(true);
  const [model, setModel] = useState(null);
  const [labelEnconder, setLabelEncoder] = useState(null);

  //Fetches the model and label encoder
  useEffect(() => {
    const fetchModel = async () => {
      setModel(
        await tf.loadLayersModel(
          "https://raw.githubusercontent.com/Schwar32/SE-Machine-Learning/main/js_model/model.json"
        )
      );
    };
    fetchModel();
    fetch("/api/bird-load-encoder")
      .then((response) => response.json())
      .then((data) => {
        setLabelEncoder(data);
      });
  }, []);

  function addResults(e) {
    setResults(!result);
    e.target.className = "item-1-button";
    setDelete(!old);
    e.target.className = "flexbox-item item-1";
    if (result) {
      e.target.className += "item-1-button-selected";
    }
  }

  function getPrediction() {
    //Gets the preprocessed data and runs prediction on it
    if (model !== null && labelEnconder !== null) {
      fetch("/api/bird-preprocess-call/")
        .then((response) => response.json())
        .then((data) => {
          var prediction = model.predict(tf.tensor(data));
          var tensorData = prediction.dataSync();
          var max = Math.max(...tensorData);
          var index = tensorData.indexOf(max);
          console.log(tensorData);
          console.log(labelEnconder[index]);
        });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    getPrediction();
    addResults(e);
  };

  return (
    <div>
      <NavBar />
      {old && (
        <div className="container">
          <div className="flexbox-item item-1">
            <div className="item-1-header">
              <h3>
                <b>Welcome to Bird Identifier</b>
              </h3>
            </div>
            <div className="item-1-body">
              <p>
                Submit a bird call and watch our neural network guess your bird
                in real time!
              </p>
            </div>

            <div className="item-1-button" onClick={handleSubmit}>
              Submit
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="container">
          <div className="flexbox-item item-1">
            <div className="item-1-header">
              <h3>
                <b>Additional Model Insights</b>
              </h3>
            </div>
            <div className="item-1-body">
              <p>
                Model guess duration: test<br></br>
                Bird is: test
              </p>
            </div>
            <div className="item-1-button" onClick={addResults}>
              Submit Again
            </div>
          </div>
          <div className="flexbox-item item-2">
            <div className="item-1-header">
              <h3>
                <b>The Results Are In</b>
              </h3>
            </div>
            <div className="item-1-body">
              <p>
                90% : test data<br></br>
                65% : test data<br></br>
                ...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BirdIdentifyer;

import "../styles/App.css";
import "../styles/Identify.css";
import NavBar from "../components/Navbar";
import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Cookies from "js-cookie";
/* FUNCTIONALITY OF SUBMIT
-After clicking the submit button
-Add a new Results class which has the same container type as item-1
-Space those two evenly on the page.
*/

function BirdIdentifyer() {
  const [result, setResults] = useState(false);
  const [old, setDelete] = useState(true);
  const [model, setModel] = useState(null);
  const [labelEncoder, setLabelEncoder] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);
  const [predictions, setPredictions] = useState(null);

  //Fetches the model and label encoder
  useEffect(() => {
    const fetchModel = async () => {
      setModel(await tf.loadLayersModel("./JS_Model/model.json"));
    };
    fetchModel();
    fetch("/api/bird-load-encoder")
      .then((response) => response.json())
      .then((data) => {
        setLabelEncoder(data);
      });

    fetch("/api/get-csrf");
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

  function readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(fileUpload);
    });
  }

  async function getPrediction() {
    var file = await readFile(fileUpload);
    var fd = new FormData();
    fd.append("file", new Blob([file]));

    if (model !== null && labelEncoder !== null) {
      fetch("/api/bird-preprocess-call/", {
        method: "POST",
        credentials: "include",
        body: fd,
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          var prediction = model.predict(tf.tensor(data));
          var tensorData = prediction.dataSync();
          var guesses = [];
          for (var i = 0; i < tensorData.length; i++) {
            guesses.push({
              label: labelEncoder[i],
              confidence: (tensorData[i] * 100).toFixed(8),
            });
          }
          guesses.sort(function (a, b) {
            return parseFloat(a.confidence) > parseFloat(b.confidence) ? -1 : 1;
          });

          console.log(guesses);
          setPredictions(guesses);
        });
    }
  }

  const handleSubmit = async (e) => {
    setPredictions(null);
    e.preventDefault();
    getPrediction();
    addResults(e);
  };

  return (
    <div>
      <NavBar />
      {old && (
        <div className="identifyer-container">
          <div className="flexbox-item item-1">
            <h1 className="item-1-header">
              <b>Welcome to Bird Identifier</b>
            </h1>
            <div className="item-1-body">
              <p className="identify-info">
                Submit a bird call and watch our neural network guess your bird
                in real time!
              </p>
            </div>

            <label className="file-upload-label">
              <input
                className="item-1-upload"
                type="file"
                onChange={(e) => setFileUpload(e.target.files[0])}
                accept="audio/*"
              ></input>
              Choose File
            </label>

            <div className="item-1-button" onClick={handleSubmit}>
              Submit
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="identifyer-container">
          <div className="flexbox-item">
            <div className="item-1-body">
              {!predictions && (
                <div>
                  <h1 className="item-1-header">
                    <b>Loading Prediction</b>
                  </h1>
                </div>
              )}

              {predictions && (
                <div>
                  <div>
                    <h1 className="item-1-header">
                      <b>The Results Are In</b>
                    </h1>
                  </div>
                  <p className="prediction prediction-top">
                    {predictions[0].label +
                      " - " +
                      Number(predictions[0].confidence).toFixed(2) +
                      "%"}
                  </p>
                  <p className="prediction">
                    {predictions[1].label +
                      " - " +
                      Number(predictions[1].confidence).toFixed(2) +
                      "%"}
                  </p>
                  <p className="prediction">
                    {predictions[2].label +
                      " - " +
                      Number(predictions[2].confidence).toFixed(2) +
                      "%"}
                  </p>
                  <p className="prediction">
                    {predictions[3].label +
                      " - " +
                      Number(predictions[3].confidence).toFixed(2) +
                      "%"}
                  </p>
                  <p className="prediction">
                    {predictions[4].label +
                      " - " +
                      Number(predictions[4].confidence).toFixed(2) +
                      "%"}
                  </p>
                  <div className="item-1-button-2" onClick={addResults}>
                    Submit Again
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BirdIdentifyer;

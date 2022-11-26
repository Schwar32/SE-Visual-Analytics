import "../styles/App.css";
import "../styles/Identify.css";
import NavBar from "../components/Navbar";
import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Cookies from "js-cookie";
import { tensor } from "@tensorflow/tfjs";
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
              confidence: tensorData[i],
            });
          }
          guesses.sort(function (a, b) {
            return a.confidence < b.confidence
              ? -1
              : a.confidence == b.confidence
              ? 0
              : 1;
          });
          guesses.reverse();
          console.log(guesses);
          setPredictions(guesses);
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
            <form
              onSubmit={handleSubmit}
              method="POST"
              encType="multipart/form-data"
            >
              <input
                type="file"
                onChange={(e) => setFileUpload(e.target.files[0])}
                accept="audio/*"
              ></input>
              <button type="submit" className="item-1-button">
                Submit
              </button>
            </form>
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

import "../styles/App.css";
import NavBar from "../components/Navbar";
import Navbar from "../components/Navbar";

function About() {
  return (
    <div>
      <Navbar />
      <div class="container-fluid">
        <div>
          <h1 class="py-5">
            <strong>
              <center>ABOUT THIS PROJECT</center>
            </strong>
          </h1>
          <p>
            Welcome to our website! The purpose of our website is to have you be
            able to compare and contrast different bird calls! Each bird call
            has its own set of visualizations, which you can compare and
            contrast the different bird calls. If you are looking to analyze
            different bird calls, this is the sight to be on. There are over 400
            different birds in our database that you can choose from (Up to
            three birds at once can be compared!). Each bird comes with their
            own set of graphs, a sound file, where the bird is found, and an
            image of what the selected bird looks like. Have fun analyzing!
          </p>
        </div>
        <div class="row">
          <div class="column">
            <div class="container">
              <h3 class="py-5">HOW DOES THE PROJECT WORKS</h3>
              <p>
                You will be able to enter any bird name from our database and
                <br></br>
                then receive a list of information about the bird from name
                <br></br>
                variations, location, calls variations of the bird, pictures,
                <br></br>
                and visuals of the bird call. There's also the machine learning
                <br></br>
                aspect of this project, users will be able to identify direct
                <br></br>
                audio from a unidentified bird and find what bird it is and in
                <br></br>
                the case that that bird call is not found in our database we
                <br></br>
                will ask the user to provide us with details about the bird so
                <br></br>
                that it can be added in the future.
              </p>
            </div>
          </div>

          <div class="column">!--maybe a pic or something--</div>

          <div>
            <h3>Team</h3>
            <div class="card-row">
              <div class="card-column">
                <div className="card">
                  <div class="container">
                    <h4>
                      <strong>Hunter</strong>
                    </h4>
                    <pi>
                      This is our <strong>MVP</strong>, and head developer.
                    </pi>
                  </div>
                </div>
              </div>
              <div class="card-column">
                <div className="card">
                  <div class="container">
                    <h4>
                      <strong>Justin</strong>
                    </h4>
                    <pi>This is our project manager.</pi>
                  </div>
                </div>
              </div>
              <div class="card-column">
                <div className="card">
                  <div class="container">
                    <h4>
                      <strong>Nick</strong>
                    </h4>
                    <pi>Deveper and Top front end programmer.</pi>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-column">
              <div className="card">
                <div class="container">
                  <h4>
                    <strong>Lorenzo</strong>
                  </h4>
                  <pi>Scrum master and UX designer.</pi>
                </div>
              </div>
            </div>
            <div class="card-column">
              <div className="card">
                <div class="container">
                  <h4>
                    <strong>Evan</strong>
                  </h4>
                  <pi>
                    Developer, Evan has helped a lot in both the coding aspect
                    and the papers of this project.
                  </pi>
                </div>
              </div>
            </div>

            <div class="card-column">
              <div className="card">
                <div class="container">
                  <h4>
                    <strong>Yeison</strong>
                  </h4>
                  <pi>Developer, helped with the front end.</pi>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3>GitHub</h3>
        <p>
          Here is the{" "}
          <a href="https://github.com/Schwar32/SE-Visual-Analytics.git">link</a>{" "}
          to the GitHub repository.
        </p>
      </div>
    </div>
  );
}

export default About;

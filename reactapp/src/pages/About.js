import "../styles/About.css";
import NavBar from "../components/Navbar";
import Navbar from "../components/Navbar";

function About() {
  return (
    <div>
      <Navbar />

      <div>
        <h1>ABOUT THIS PROJECT</h1>
        <p className="pi">
          Welcome to our website! The purpose of our website is to have you be
          able to compare and contrast different bird calls! Each bird call has
          its own set of visualizations, which you can compare and contrast the
          different bird calls. If you are looking to analyze different bird
          calls, this is the sight to be on. There are over 400 different birds
          in our database that you can choose from (Up to three birds at once
          can be compared!). Each bird comes with their own set of graphs, a
          sound file, where the bird is found, and an image of what the selected
          bird looks like. Have fun analyzing!
        </p>
      </div>

      <h3>TEAM</h3>

      <table>
        <tr>
          <th>Project Manager </th>
          <th>Justin</th>
        </tr>

        <tr>
          <th>Scrum Master </th>
          <th>Lorenzo</th>
        </tr>

        <tr>
          <th>Developers</th>
          <th>Nick &emsp; Evan &emsp; Hunter &emsp; Yeison</th>
        </tr>
      </table>

      <div>
        <h3>PACKAGES</h3>
        <p className="pi">
          This is the list of the main packages that were used for this project.
        </p>

        <ul className="list">
          <li>Numpy</li>
          <li>TensorFlow</li>
          <li>Django</li>
          <li>Keras</li>
          <li>Plotly</li>
          <li>Librosa</li>
          <li>and others</li>
        </ul>
      </div>

      <br></br>

      <link rel="stylesheet" href="About.css"></link>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <div className="center">
        <a href="https://github.com/Schwar32/SE-Visual-Analytics.git">
          <button>
          <i class="fa-brands fa-github-alt"></i>
          </button>
        </a>
      </div>
    </div>
  );
}

export default About;

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

      <div>
        <h3>HOW DOES THE PROJECT WORKS</h3>
        <p className="pi">
          You will be able to enter any bird name from our database and then
          receive a list of information about the bird from name variations,
          location, calls variations of the bird, pictures, and visuals of the
          bird call. There's also the machine learning aspect of this project,
          users will be able to identify direct audio from a unidentified bird
          and find what bird it is and in the case that that bird call is not
          found in our database we will ask the user to provide us with details
          about the bird so that it can be added in the future.
        </p>
      </div>

      <h3>Team</h3>

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
          <th>Nick, Evan, Hunter, Yeison</th>
        </tr>
      </table>

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

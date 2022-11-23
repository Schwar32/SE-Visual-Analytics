import "../styles/App.css";
import NavBar from "../components/Navbar";

function About() {
  return (
    <div>
      <NavBar />
      <div className="container-fluid ">
        <div className="row justify-content-center">
          <p className="py-5">About this project</p>
          <p className="py-5">
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
      </div>
    </div>
  );
}

export default About;

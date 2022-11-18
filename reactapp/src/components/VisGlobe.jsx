import Globe from "react-globe.gl";

const [countries, setCountries] = useState({ features: [] });
const [hoverD, setHoverD] = useState();

useEffect(() => {
  fetch(
    "https://github.com/vasturiano/react-globe.gl/blob/9cb88b56c9240a62054208211f26a76e21e6dff7/example/datasets/ne_110m_admin_0_countries.geojson"
  )
    .then((res) => res.json())
    .then(setCountries);
}, []);

function VisGlobe() {
  return <div className="vis-globe"></div>;
}

export default VisGlobe;

import React, { useEffect, useState } from "react";
import Globe from "react-globe.gl";
import data from "../data/geo.geojson";

function VisGlobe({ location, latitude, longitude }) {
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();

  useEffect(() => {
    fetch(data)
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  function countryColor(country) {
    if (country.properties.ADMIN === location) {
      return "5bfa";
    } else if (country === hoverD) {
      return "#66aa";
    } else {
      return "#0053";
    }
  }

  return (
    <div className="vis-globe">
      <Globe
        width={300}
        height={300}
        globeImageUrl="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="#0000"
        lineHoverPrecision={0}
        showGraticules={false}
        polygonsData={countries.features.filter(
          (d) => d.properties.ISO_A2 !== "AQ"
        )}
        polygonAltitude={(d) => (d === hoverD ? 0.025 : 0.01)}
        polygonCapColor={countryColor}
        polygonSideColor={() => "rgba(0, 100, 0, 0.15)"}
        polygonStrokeColor={() => "#111c"}
        polygonLabel={({ properties: d }) => d.ADMIN}
        onPolygonHover={setHoverD}
        polygonsTransitionDuration={300}
        atmosphereColor={""}
        pointsData={[
          {
            lat: latitude,
            lng: longitude,
            color: "#f00c",
            size: 0.03,
            radius: 0.75,
          },
        ]}
        pointColor="color"
        pointAltitude="size"
        pointRadius="radius"
        pointsTransitionDuration={0}
      />
    </div>
  );
}

export default VisGlobe;

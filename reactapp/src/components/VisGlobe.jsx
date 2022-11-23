import React, { useEffect, useState } from "react";
import Globe from "react-globe.gl";
import data from "../data/geo.geojson";

function VisGlobe({ location, latitude, longitude, width, height }) {
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();

  const HIGHLIGHTED_COUNTRY = "#5bfa";
  const SELECTED_COUNTRY = "#66aa";
  const BLANK_COUNTRY = "#0053";

  useEffect(() => {
    fetch(data)
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  function countryColor(country) {
    if (country.properties.ADMIN === location) {
      return HIGHLIGHTED_COUNTRY;
    } else if (country === hoverD) {
      return SELECTED_COUNTRY;
    } else {
      return BLANK_COUNTRY;
    }
  }

  return (
    <Globe
      width={width}
      height={height}
      animateIn={false}
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
      polygonSideColor={() => "rgba(0, 20, 0, 0.15)"}
      polygonStrokeColor={() => "#111c"}
      polygonLabel={({ properties: d }) => d.ADMIN}
      onPolygonHover={setHoverD}
      polygonsTransitionDuration={300}
      atmosphereColor={"#334"}
      atmosphereAltitude={0.1}
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
  );
}

export default VisGlobe;

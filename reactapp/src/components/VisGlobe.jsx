import React, { useEffect, useState, useRef } from "react";
import Globe from "react-globe.gl";
import data from "../data/geo.geojson";
import { TextureLoader, SphereGeometry, Mesh, MeshPhongMaterial } from "three";

function VisGlobe({ location, latitude, longitude, width, height, rotate }) {
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const globe = useRef();
  const HIGHLIGHTED_COUNTRY = "#5bf7";
  const SELECTED_COUNTRY = "#66a7";
  const BLANK_COUNTRY = "#0000";

  useEffect(() => {
    fetch(data)
      .then((res) => res.json())
      .then(setCountries);

    let MAP_CENTER = { lat: latitude, lng: longitude, altitude: 1.75 };
    if (rotate) {
      globe.current.controls().autoRotate = true;
      globe.current.controls().autoRotateSpeed = 0.35;
    }
    globe.current.pointOfView(MAP_CENTER, 1000);
    globe.current.controls().maxDistance = 250;
    globe.current.controls().minDistance = 115;

    const CLOUDS_IMG_URL = "./clouds.png";
    const CLOUDS_ALT = 0.001;
    const CLOUDS_ROTATION_SPEED = -0.005;

    new TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
      const clouds = new Mesh(
        new SphereGeometry(
          globe.current.getGlobeRadius() * (1 + CLOUDS_ALT),
          75,
          75
        ),
        new MeshPhongMaterial({ map: cloudsTexture, transparent: true })
      );
      globe.current.scene().add(clouds);

      (function rotateClouds() {
        clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
        requestAnimationFrame(rotateClouds);
      })();
    });
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
      ref={globe}
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
      polygonAltitude={(d) => (d === hoverD ? 0.0125 : 0.0075)}
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
          radius: 0.5,
        },
      ]}
      pointColor="color"
      pointAltitude="size"
      pointRadius="radius"
      pointsTransitionDuration={0}
      pointResolution={20}
      onPointHover={(point) => {
        console.log(point);
      }}
    />
  );
}

export default VisGlobe;

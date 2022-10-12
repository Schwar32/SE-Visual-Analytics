import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

function Graph(props) {
  const [data, setData] = useState([]);
  const [layout, setLayout] = useState({});
  const [figure, setFigure] = useState();

  useEffect(() => {
    setData(props.data);
    setLayout(props.layout);
  });

  return (
    <div>
      <Plot
        data={data}
        layout={layout}
        onInitialized={(figure) => setFigure(figure)}
        onUpdate={(figure) => setFigure(figure)}
      ></Plot>
    </div>
  );
}

export default Graph;

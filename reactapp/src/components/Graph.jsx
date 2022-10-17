import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

function Graph(props) {
  const [data, setData] = useState(props.data);
  const [layout, setLayout] = useState(props.layout);

  useEffect(() => {
    setData(props.data);
    setLayout(props.layout);
  }, [props]);

  return (
    <div>
      {props.data === "" ? (
        <div />
      ) : (
        <Plot
          data={data}
          layout={{
            width: 600,
            height: 450,
            title: {
              text: layout.title.text,
              font: {
                color: "black",
              },
            },
            xaxis: {
              title: layout.xaxis.title,
              color: "black",
            },
            yaxis: {
              title: layout.yaxis.title,
              color: "black",
            },
            paper_bgcolor: "white",
            plot_bgcolor: "white",
          }}
        ></Plot>
      )}
    </div>
  );
}

export default Graph;

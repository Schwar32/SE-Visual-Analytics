import Plot from "react-plotly.js";

function Graph({ data, layout }) {
  return (
    <div>
      {data === "" ? (
        <div />
      ) : (
        <Plot
          data={data}
          layout={{
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
            hovermode: false,
          }}
          config={{ responsive: true }}
          useResizeHandler
          className="plotly-chart"
        ></Plot>
      )}
    </div>
  );
}

export default Graph;

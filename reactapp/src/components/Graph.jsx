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
                color: "white",
              },
            },
            xaxis: {
              title: layout.xaxis.title,
              color: "white",
            },
            yaxis: {
              title: layout.yaxis.title,
              color: "white",
            },
            paper_bgcolor: "#0c082a",
            plot_bgcolor: "#0c082a",
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

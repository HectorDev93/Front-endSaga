import React from "react";

import { Bar, Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

const ChartDash = (props) => {
  var options = {
    responsive: true,
    animation: {
      duration: 0
  },
    plugins: {
      datalabels: {
        /*    formatter: (value, ctx) => {
          let datasets = ctx.chart.data.datasets;
            let percentage;
          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            let sum = datasets[0].data.reduce((a, b) => a + b, 0);
            let percentage = Math.round((value / sum) * 100) + "%";
            return percentage;
          } else {
            return percentage;
          }
        }, */
        color: "rgba(0,0,0,1)",
      },
    },
  };
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.labelTitle,
        data: props.dataset,
        backgroundColor: props.colours,
        borderColor: props.colours,
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      {props.type === "bar" ? (
        <Bar
          data={data}
          plugins={[ChartDataLabels]}
          width={500}
          height={200}
          options={options}
        />
      ) : (
        <Pie
          data={data}
          plugins={[ChartDataLabels]}
          width={500}
          height={200}
          options={options}
        />
      )}
    </div>
  );
};

export default ChartDash;

import React from "react";

import { Bar, Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
//import { startTransition } from "react";

const ChartDash = (props) => {
  var options = {
    responsive: true,
    animation: false,
   // maintainAspectRatio: false,
    scales:{
      y: {
        min: 0,
        max: 100
      },
      x:{
        ticks: { 
          font:{
            color: 'rgba(0,0,0,0)',
            size: 17,
            weight: 'bold'
          }
          
        }
      }
    },
    plugins: {
      legend:{
        labels:{
          font:{
            size: 17,
            weight: 'bold'
          }
        }
      },
      datalabels: {
          /*  formatter: (value, ctx) => {
          let datasets = ctx.chart.data.datasets;
            let percentage;
          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            let sum = datasets[0].data.reduce((a, b) => a + b, 0);
            let percentage = Math.round((value / sum) * 100) + "%";
            return percentage;
          } else {
            return percentage;
          }
          },  */
          align: 'center',
          clamp: true,
        anchor: 'center',
        font:{
          size: 17,
          weight: 'bold'

        },
        color: "rgba(0,0,0,0.90)",
      },
    },
  };
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.labelTitle,
        data: props.dataset,
        tension: 100,
        fill: false,
        pointRadius: 1000,
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
         // width={500}
         // height={-200}
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

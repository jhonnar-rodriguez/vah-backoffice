import { FC, ReactElement } from "react"
import { Bar, Doughnut } from "react-chartjs-2";
import { InformationByTrace } from "../../contracts/general/trace/ITrace";

type CustomChartProps = {
  traces: InformationByTrace[],
  chartType: 'bar' | 'doughnut',
  mainLabel: string,
}

const CustomChart: FC<CustomChartProps> = ({ mainLabel, chartType, traces }): ReactElement => {
  let customData: number[] = [1];
  let customLabels: string[] = [mainLabel];

  if (traces.length > 0) {
    customData.splice(0, 1);
    customLabels.splice(0, 1);
  }

  for (const trace of traces.slice(0, 10)) {
    customLabels = [
      ...customLabels,
      trace.name,
    ];

    customData = [
      ...customData,
      trace.quantity,
    ];
  };

  const data = {
    labels: customLabels,
    datasets: [{
      label: mainLabel,
      data: customData,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    }],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      {chartType === 'bar' && <Bar data={data} options={options} />}
      {chartType === 'doughnut' && <Doughnut data={data} />}
    </>
  )
}

export default CustomChart;

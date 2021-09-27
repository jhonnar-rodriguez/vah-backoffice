import { FC, ReactElement } from "react"
import { Bar, Doughnut } from "react-chartjs-2";
import { InformationByTrace } from "../../contracts/general/trace/ITrace";

type CustomChartProps = {
  traces: InformationByTrace[],
  chartType: 'bar' | 'doughnut',
  mainLabel: string,
}

const availableColors: string[] = [
  '#346751',
  '#C84B31',
  '#54E346',
  '#3C8DAD',
  '#D5BFBF',
  '#664E88',
  '#FCFFA6',
  '#C1FFD7',
  '#B5DEFF',
  '#CAB8FF',
  '#B5DEFF',
];

const CustomChart: FC<CustomChartProps> = ({ mainLabel, chartType, traces }): ReactElement => {
  let customData: number[] = [1];
  let customLabels: string[] = [mainLabel];
  let colors: string[] = ['#A12568'];
  let colorCounter: number = 0;

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

    colors = [
      ...colors,
      availableColors[colorCounter],
    ];

    colorCounter++;
  };

  const data = {
    labels: customLabels,
    datasets: [{
      label: mainLabel,
      data: customData,
      borderColor: colors,
      borderWidth: 1,
      backgroundColor: colors,
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
    plugins: {
      legend: {
        display: true,
        onClick: () => false,
      }
    }
  };

  return (
    <>
      {chartType === 'bar' && <Bar data={data} options={options} />}
      {chartType === 'doughnut' && <Doughnut data={data} />}
    </>
  )
}

export default CustomChart;

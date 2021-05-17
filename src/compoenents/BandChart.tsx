import { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { SocketContext } from '../context/SocketContext';
import { Bands } from '../types/types';

export const BandChart = () => {
  const { socket } = useContext(SocketContext);
  const [bandData, setBandData] = useState<Bands[]>([]);

  useEffect(() => {
    socket!.on('current-bands', (bands: []) => {
      setBandData(bands);
    });
  }, [socket]);

  const data = {
    labels: bandData.map((band) => band.name),
    datasets: [
      {
        label: '# of Votes',
        data: bandData.map((band) => band.votes),
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
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Bands Bar Chart',
      },
    },
  };

  return (
    <>
      <Bar data={data} options={options} type='bar' />
    </>
  );
};

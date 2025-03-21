import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { sortCategoryWise } from '../utils/seperator';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Chartss(props) {
  let categories = ['Grocery', 'Vehicle', 'Shopping', 'Travel', 'Food', 'Fun', 'Other'];
  const totalexp = sortCategoryWise(props.exdata, categories);

  const data = {
    labels: ['Grocery', 'Vehicle', 'Shopping', 'Travel', 'Food', 'Fun', 'Other'],
    datasets: [
      {
        label: "$",
        data: totalexp,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',  // Adjusting opacity for colors
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(230, 57, 70,0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(230, 57, 70,1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 5, // Slight hover effect
      },
    ],
    options: {
      responsive: true,  // Make chart responsive
      plugins: {
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.7)',  // Tooltip background color
          titleFont: {
            size: 16,  // Font size for title in tooltip
          },
          bodyFont: {
            size: 14,  // Font size for body in tooltip
          },
          callbacks: {
            label: function (tooltipItem) {
              return '$' + tooltipItem.raw.toFixed(2);  // Format label with USD currency
            },
          },
        },
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 14,  // Font size for legend labels
            },
            padding: 20,  // Padding for legend items
          },
        },
      },
      cutout: '70%',  // Makes the doughnut chart look more sleek
      animation: {
        animateRotate: true,
        animateScale: true,
      },
    },
  };

  return <Doughnut className='w-full h-full' data={data} />;
}
import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Cas', 'Guérisons', 'Morts'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Etat actuel en ${country}` },
        }}
      />
    ) : null
  );

  const lineChart = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
          datasets: [{
            data: dailyData.map((data) => data.confirmed),
            label: 'Cas',
            borderColor: 'rgba(46, 190, 130, 0.455)',
            backgroundColor: 'rgba(46, 190, 130, 0.085)',
            fill: true,
          }, {
            data: dailyData.map((data) => data.deaths),
            label: 'Morts',
            borderColor: 'red',
            backgroundColor: 'rgba(194, 47, 66, 0.732)',
            fill: true,
          },  {
            data: dailyData.map((data) => data.recovered),
            label: 'Guérisons',
            borderColor: 'rgb(223, 190, 47',
            backgroundColor: 'rgb(223, 190, 47',
            fill: true,
          },
          ],
        }}
      />
    ) : null
  );

  return (
    
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
      
  );
};

export default Chart;
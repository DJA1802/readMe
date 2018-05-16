const visuStyles = () => {
  const ORANGE = '#FFC400';
  const BLUE = '#2979FF';

  return {
    axisX: {
      axis: { stroke: 'black' },
      ticks: {
        size: 5,
        stroke: 'black',
        strokeWidth: 1,
        padding: 5
      },
      tickLabels: {
        fill: 'black',
        fontSize: 12
      }
    },
    axisY: {
      axis: { stroke: 'black' },
      ticks: { size: 5, stroke: 'black', strokeWidth: 1 },
      tickLabels: {
        fill: 'black',
        fontSize: 14
      }
    },
    area: {
      data: {
        strokeWidth: 1,
        stroke: ORANGE,
        fillOpacity: 0.7,
        fill: ORANGE
      }
    },
    bar: {
      data: {
        strokeWidth: 1,
        stroke: BLUE,
        fillOpacity: 0.7,
        fill: BLUE
      }
    },
    pie: {
      labels: {
        fill: 'white'
      }
    },
    pieLabel: {
      fill: 'black'
    },
    title: {
      fontFamily: 'nimbus_monoregular',
      textAnchor: 'start',
      verticalAnchor: 'end',
      fill: '#000000',
      fontSize: '18px',
      fontWeight: 'bold'
    }
  };
};

export default visuStyles;

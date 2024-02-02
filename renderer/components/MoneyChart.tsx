import { useState } from "react"
import Chart from "react-apexcharts";

const MoneyChart = () => {
    
    const [data, setData] = useState(true);

    if (!data) {
        return <h1>loading...</h1>
    } 

    const options = {
        toolbar: {
            show: false
        },
        chart: {
          id: ""
        },
        fill: {
            type: 'solid',
            opacity: 0.3, // Opacidade da área
        },
        stroke: {
            width: 3,
            curve: 'smooth', // Curva suave para tornar a área arredondada
        },
        dataLabels: {
            enabled: false, // Desativa os rótulos de dados
        },
        colors: ['#D81CB3'], // Cor roxa
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            labels: {
                style: {
                  fontWeight: 'bold',
                },
              },
        },
        yaxis: {
            labels: {
                style: {
                  fontWeight: 'bold',
                },
              },
        }
    }

    const series= [
        {
          name: "valor recebido",
          data: [1230, 1640, 1645, 1550, 1250, 1760, 2070, 1990, 1082, 1075]
        }
      ]

    return (
        <Chart options={options} series={series} height={375} width={750} type="area"/>
    )
}

export default MoneyChart;
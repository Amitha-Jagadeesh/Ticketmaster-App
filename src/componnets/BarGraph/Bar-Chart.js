import React from 'react'
import BarGraph from 'react-bar-chart'

export default function BarChart(props){
    console.log(props)
    const data = [
        {text: 'CompletedTickets', value: props.data1}, 
        {text: 'OpenTickets', value: props.data2} 
      ];
    console.log(data)
    return(
        <div style={{left:'20%',width:'20%',display:'inline-block'}}>
        <p>Tickets By department</p> 
    <BarGraph
        data={data}
        width={300}
        height={300}
        margin={{top: 10, bottom: 50, left: 50, right: 10}}/>     
        </div>
    )
}
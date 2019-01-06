import React, { Component } from 'react';
import './App.css';
import TicketListTable from './componnets/TicketTable/Ticketlist'


class App extends Component {
  render() {
    return (
      <div style={{marginLeft:'20px'}}>               
        <h2>Ticket Master</h2>         
        <TicketListTable /><br />
        <div style={{width:'20%',display:'inline-block'}}>
          <h2>Some Stats</h2>
          <p style={{fontSize:'15px'}}>Ticket Priority in %</p>
          <img src='/images/pie_chart.gif' alt = 'fetching'></img>                  
        </div>
        <div style={{left:'20%',width:'20%',display:'inline-block'}}>
        <p>Tickets By department</p>
        <img src='/images/bar_graph.gif' alt = 'fetching'></img>       
        </div>
      </div>
        
    );
  }
}
export default App;

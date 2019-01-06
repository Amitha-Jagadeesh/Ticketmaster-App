import React from 'react'
import axios from 'axios'
import TicketTableRow from './tickettablerow'
import AddTicketForm from '../AddTicket/AddTicketform'
import SearchTicket from '../search/searchTicket'
import SearchByPriority from '../searchByPriority/searchByPriority'
import Progressbar from '../ProgressBar/progressBar';

export default class TicketListTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            flag: 0,
            tickets: [],
            IsChecked: false,
            ticketSearchByValue: [],
            ticketSearchedByPriority: [],
            numOfcheckedStatus: 0,
            checkedTicketPercentage: 0,
            loading: true
        }
        this.statusCheckbocChecked = this.statusCheckbocChecked.bind(this)
        this.addTicketFromAddTicketForm = this.addTicketFromAddTicketForm.bind(this)
        this.searchTicket = this.searchTicket.bind(this)
        this.searchByPriority = this.searchByPriority.bind(this)
        this.calculateProgress = this.calculateProgress.bind(this)
    }
    addTicketFromAddTicketForm(newTicket) {
        this.setState(previuosState => {
            return {
                tickets: previuosState.tickets.concat(newTicket)
            }
        })
    }
    searchTicket(ticket_code) {
        let result = this.state.tickets.find(ticket => {
            return ticket_code === ticket.ticket_code
        })
        if (result) {
            this.setState({
                flag: 1,
                ticketSearchByValue: result
            })
        } else {
            alert('Ticket not found')
        }
    }
    searchByPriority(value) {
        if (value !== 'All') {
            let result = this.state.tickets.filter(ticket => {
                return value === ticket.priority
            })
            if (result) {
                this.setState({
                    flag: 2,
                    ticketSearchedByPriority: result
                })
            }
        } else {
            this.setState({
                flag: 0
            })
        }

    }
    statusCheckbocChecked(code) {
        let ticket = this.state.tickets.find(ticket => {
            return ticket.ticket_code === code
        })
        if (ticket) {
            let new_ticket = {
                name: ticket.name,
                department: ticket.department,
                ticket_code: ticket.ticket_code,
                priority: ticket.priority,
                message: ticket.priority,
                status: ticket.status === 'open' ? 'completed' : 'open'
            }
            axios.put(`http://dct-api-data.herokuapp.com/tickets/${code}?api_key=25f74f2855535f54`, new_ticket).then(response => {
                let updated_ticket = response.data
                this.state.tickets.forEach(ticket => {
                    if (ticket.ticket_code === updated_ticket.ticket_code) {
                        ticket.status = updated_ticket.status
                    }
                })
                this.calculateProgress()
            })
        }
    }

    componentDidMount() {
        axios.get('http://dct-api-data.herokuapp.com/tickets?api_key=25f74f2855535f54').then(response => {
            this.setState({
                tickets: response.data
            })
            this.calculateProgress()
        })

    }

    calculateProgress() {
        let checkedTickets = 0
        this.state.tickets.map(ticket => {
            if (ticket.status === 'completed') {
                checkedTickets = checkedTickets + 1
            }
        })
        let percentage = ((checkedTickets / this.state.tickets.length) * 100)
        this.setState({
            numOfcheckedStatus: checkedTickets,
            checkedTicketPercentage: percentage,
            loading: false

        })
    }

    render() {
        return (

            <div>
                <SearchTicket searchTicket={this.searchTicket} />
                <SearchByPriority searchByPriority={this.searchByPriority} />
                <p style={{ fontSize: '20px', marginTop: '0.1%', marginBottom: '1%' }}>Listing Tickets-{this.state.flag === 0 ? this.state.tickets.length : this.state.flag === 1 ? this.state.ticketSearchByValue.length : this.state.ticketSearchedByPriority.length}</p>
                <AddTicketForm addTicketFromAddTicketForm={this.addTicketFromAddTicketForm} />
                <table border='1'>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Priority</th>
                            <th>Message</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.flag === 0 ?
                            this.state.tickets.map(ticket => {
                                return (
                                    <TicketTableRow key={ticket.ticket_code} code={ticket.ticket_code} name={ticket.name} department={ticket.department} priority={ticket.priority} message={ticket.message} IsChecked={ticket.status === 'open' ? false : true} statusCheckbocChecked={this.statusCheckbocChecked} />
                                )
                            })
                            : this.state.flag === 1 ? <TicketTableRow key={this.state.ticketSearchByValue.ticket_code} code={this.state.ticketSearchByValue.ticket_code} name={this.state.ticketSearchByValue.name} department={this.state.ticketSearchByValue.department} priority={this.state.ticketSearchByValue.priority} message={this.state.ticketSearchByValue.message} IsChecked={this.state.ticketSearchByValue.status === 'open' ? false : true} statusCheckbocChecked={this.statusCheckbocChecked} />
                                : this.state.ticketSearchedByPriority.map(ticket => {
                                    return (
                                        <TicketTableRow key={ticket.ticket_code} code={ticket.ticket_code} name={ticket.name} department={ticket.department} priority={ticket.priority} message={ticket.message} IsChecked={ticket.status === 'open' ? false : true} statusCheckbocChecked={this.statusCheckbocChecked} />
                                    )
                                })
                        }
                    </tbody>
                </table><br /><br />
                {this.state.loading ? <img src='/images/spinner.gif' alt='fetching data'></img> : <Progressbar percentage={this.state.checkedTicketPercentage} />}
            </div>

        );
    }
}



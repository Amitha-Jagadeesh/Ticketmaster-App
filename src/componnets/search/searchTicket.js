import React from 'react'

export default class SearchTicket extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value:''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.searchTicket = this.searchTicket.bind(this)
    }

    handleInputChange(event){
        this.setState({
            value:event.target.value
        })
    }

    searchTicket(event){
        event.preventDefault()
        this.props.searchTicket(this.state.value)
    }

    render(){
        return(
            <div style={{marginLeft:'20%',marginBottom:'0.2%'}}>
                <form>
                    <input type="text" placeholder="Search.." name="search" value = {this.state.value} onChange={this.handleInputChange} />
                    <button onClick = {this.searchTicket}>Search</button>
                </form>
            </div>
        )
    }
}

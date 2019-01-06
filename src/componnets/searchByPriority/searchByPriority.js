import React from 'react'

export default class SearchByPriority extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value:'',
            searchByPriority:''
        }
        this.click = this.click.bind(this)
    }

    click(event){
        this.setState({
           value:event.target.value,
           searchByPriority:this.props.searchByPriority(event.target.value)
        })
        
    }

    render(){
        return(
            <div className="btn-group" style={{marginLeft:'20%',marginTop:'0.2%',display:'inline-block',border:'1px solid blue'}} >  
                <button value = "All" onClick = {this.click}>All</button>                              
                <button value = "High" onClick = {this.click}>High</button>
                <button value = "Medium" onClick = {this.click}>Medium</button>
                <button value = "Low"onClick = {this.click}>Low</button>
            </div>
        )
    }
}

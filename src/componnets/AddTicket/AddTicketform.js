import React from 'react'
import axios from 'axios'
import {addTicketForm} from './style';

export default class AddTicketForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            Name:'',
            Department:'',
            checkHighPriorityRadioButton:false,
            checkMediumPriorityRadioButton:false,
            checkLowPriorityRadioButton:false,
            Message:'',
            addTicketFromAddTicketForm:''

        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSelectionChange = this.handleSelectionChange.bind(this)
        this.handleInputRadioChange = this.handleInputRadioChange.bind(this)
        this.handleSubmitButton = this.handleSubmitButton.bind(this);
        this.reset = this.reset.bind(this)
        }        
    handleInputChange(event){
        this.setState({    
            [event.target.name]:event.target.value
        })        
    } 
    handleSelectionChange(event){
        this.setState({
            Department:event.target.value
        })
    }   
    handleInputRadioChange(event){
        if(event.target.value === 'High'){
            this.setState({          
                checkHighPriorityRadioButton:true,
                checkMediumPriorityRadioButton:false,
                checkLowPriorityRadioButton:false

            })
        }else if(event.target.value === 'Medium'){
            this.setState({          
                checkHighPriorityRadioButton:false,
                checkMediumPriorityRadioButton:true,
                checkLowPriorityRadioButton:false
            })
        }
        else{
            this.setState({          
                checkHighPriorityRadioButton:false,
                checkMediumPriorityRadioButton:false,
                checkLowPriorityRadioButton:true
            })
        }
    } 
    handleSubmitButton(event){
        event.preventDefault()          
        let ticket={
            name:this.state.Name,
            department:this.state.Department,
            priority:this.state.checkHighPriorityRadioButton === true?'High':this.state.checkMediumPriorityRadioButton === true?'Medium':'Low' ,
            message:this.state.Message 
        }
        axios.post('http://dct-api-data.herokuapp.com/tickets?api_key=25f74f2855535f54',ticket).then(response=>{
            let new_ticket = response.data
                this.setState({
                    addTicketFromAddTicketForm:this.props.addTicketFromAddTicketForm(new_ticket)
                })                    
        }) 
    }  
    reset(){
        this.setState({
            Name:'',
            Department:'',
            checkHighPriorityRadioButton:false,
            checkMediumPriorityRadioButton:false,
            checkLowPriorityRadioButton:false,
            Message:''
        })
    }
    render(){
        return(
            <div className= {addTicketForm} style={addTicketForm}> 
                <label style={{fontWeight:'bold'}}>Add Ticket</label>
                <form style={{padding:'20px'}}onSubmit = {this.handleSubmitButton}>
                <label>Name:
                    <input type = "text" id ='Name' name = "Name" value = {this.state.Name} onChange = {this.handleInputChange} /><br />
                </label>
                <label>Department:
                    <select value = {this.state.value} onChange = {this.handleSelectionChange}>
                        <option >select</option>
                        <option value = 'HR'>HR</option>
                        <option value = 'Sales'>Sales</option>
                        <option value = 'Technical'>Technical</option>
                    </select><br />
                </label>
                <label htmlFor = 'priority'>Priority:</label>
                    <input type = 'radio' id = 'high' name = 'priority' value = 'High' checked = {this.state.checkHighPriorityRadioButton} onChange = {this.handleInputRadioChange}/>
                    <label htmlFor = 'high'>High</label><br />
                    <input type = 'radio' id = 'medium' name = 'priority' value = 'Medium'style={{marginLeft:'59px'}}checked = {this.state.checkMediumPriorityRadioButton} onChange = {this.handleInputRadioChange} />
                    <label htmlFor = 'medium'>Medium</label><br/>
                    <input type = 'radio' id = 'low' name = 'priority'value = 'Low'style={{marginLeft:'59px'}} checked = {this.state.checkLowPriorityRadioButton} onChange = {this.handleInputRadioChange}/>
                    <label htmlFor = 'low'>Low</label><br/>
                <label>Message:
                <textarea rows = '4' cols = '10' name = 'Message'value = {this.state.Message} onChange = {this.handleInputChange}></textarea>
                </label><br />
                <input type = "submit" value = "Submit" />
                <input type = "reset" value = "Reset" style={{marginLeft:'10px'}}onClick ={this.reset} />
                </form>         
            </div>
        )
    }
}
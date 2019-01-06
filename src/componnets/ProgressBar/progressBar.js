import React from 'react'
import Progress from 'react-progressbar'
 
export default class Progressbar extends React.Component{
    constructor(props){
        super(props)
    }
  render(){
    return (
      <div>
        <Progress completed={this.props.percentage} />
      </div>
    );
  }
}
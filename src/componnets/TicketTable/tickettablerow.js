import React from 'react'

export default function TicketTableRow(props){
    return(
        <tr>
            <td>{props.code}</td>
            <td>{props.name}</td>
            <td>{props.department}</td>
            <td>{props.priority}</td>
            <td>{props.message}</td>
            <td><input type="checkbox" name="checkbox" defaultChecked={props.IsChecked} onChange = {()=>{
                 props.statusCheckbocChecked(props.code)
            }}/></td>
        </tr>
    )
}
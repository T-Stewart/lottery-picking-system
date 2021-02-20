import React from 'react'
import TicketCollection from './TicketCollection'
import Enter from '../Enter/Enter'
// We have ten tickets - and 6 lots of two wanting tickets 
// everytime someone wins tickets - two tickets are removed from total
//when last set of two tickets are gone message saying 'sorry bad luck'
// randomise entrants
// select winner
// remove two tickets from total


export default class Picking extends React.Component{
    constructor(){
        super()
        this.state =  {
            draft : [
            {name: 'Jim',
            ticketRequest: 2},
            {name: 'Stan',
            ticketRequest: 2},
            {name: 'Phil',
            ticketRequest: 2},
            {name: 'Larry',
            ticketRequest: 2},
            {name: 'Greg',
            ticketRequest: 2},
            {name: 'Alex',
            ticketRequest: 2},
            {name: 'Jeff',
            ticketRequest: 2},
            {name: 'Terry',
            ticketRequest: 2},
            {name: 'Paul',
            ticketRequest: 2},
            {name: 'Euan',
            ticketRequest: 2},
            {name: 'Tarquin',
            ticketRequest: 2},
            
            ],
            requestedTickets: 0,
            ticketAllocation: 10,
            draw: true,

        }
    }
    componentDidMount = () =>{
        this.tickets()
    }

    tickets = () => {
        const ticketSum = new TicketCollection(...this.state.draft);
        
        this.setState({requestedTickets: ticketSum.sum('ticketRequest')})
        
    }


    lotteryResults = () => {
        let i =  Math.floor(Math.random()* this.state.draft.length)  
        console.log(this.state.draft[i].name)  
        if (this.state.draw === true){
            this.setState({ticketAllocation: this.state.ticketAllocation - this.state.draft[i].ticketRequest})
        }; 
        if(this.state.ticketAllocation <= 0) {
            alert('No more tickets!!!')
            this.setState({ticketAllocation: 0 })
            return null
        }
        console.log(this.state.ticketAllocation)
        

    }
    render(){
        return (
            <div>
                <Enter/>
                <button onClick={this.lotteryResults}>Lottery Results</button>
            </div>
        )
    }
}
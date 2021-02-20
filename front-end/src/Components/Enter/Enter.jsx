import React from 'react';
import axios from 'axios'
import TicketCollection from './TicketCollection'
//TODO
//Github
//Style
//Github
//Explain yourself
//refactor
//Github
//tinker
//Github

export default class Enter extends React.Component {
    constructor(){
        super();
        this.state={
            name:'',
            ticketRequest: 0,
            entrants: [],
            winners: [],
            ticketAllocation: 10,
            minTicketAllocation: 0,
            draw: false
        }
    }

    componentDidMount = () => {
        this.getLotteryEntrants(); 
    }

    getLotteryEntrants = () => {
        axios.get('/api')
        .then((response) => {
            const data = response.data;
            this.setState({ entrants: data});
            console.log('data has been recieved');
        })
        .catch(() => {
            alert('error retrieving data')
        });
    };

    submit = (e) => {
        e.preventDefault();
        const payload = {
            name: this.state.name,
            ticketRequest: this.state.ticketRequest
        };

        axios({
            url: 'http://localhost:3000/api/save',
            method: 'POST',
            data: payload

        })
        .then(() => {
            console.log('Data has been sent to the server');
            this.resetUserInputs();
            this.getLotteryEntrants();
        })
        .catch(() => {
            console.log('Internal server error');
        });
    };

    resetUserInputs = () => {
        this.setState({
            name: '',
            ticketRequest: 0
        });
    };

    handleChange = ({target}) => {
        const {name, value } = target;
        this.setState({
            [name]: value
        });
    };

    test = () => {
        console.log(this.state.entrants)
    }

    lotteryResults = () => {
        let numberOfWinners = this.state.ticketAllocation / this.state.entrants[0].ticketRequest

        let draw = this.shuffle(this.state.entrants)
        let winners = draw.slice(0,numberOfWinners)

        console.log(winners)
        
        let number = new TicketCollection(...winners)
        let tickets = number.sum('ticketRequest')
        this.setState({draw:true, winners: winners})
        this.setState({ticketAllocation: this.state.ticketAllocation - tickets})
        
        if(this.state.ticketAllocation <= 0) {
            alert('No more tickets!!!')
            this.setState({ticketAllocation: 0 })
            return null
        }    
    };

    displayWinner = () => {
        
        if(this.state.draw === true) {
            return(
                <div>
                    <h1>The draw has been completed</h1>
                    <h3>the winners are...</h3>
                    {this.state.winners.map(({id,name}) => {
                        return(
                            <h4 key={id}>{name}</h4>
                        )
                    })}
                </div>
            )
        }
    }

    shuffle = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while( 0 !== currentIndex){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue
        }
        return array
    }

    render() {
        return(
            <div>
                 <form className="form-area" onSubmit={this.submit}>
                    <input
                        type= "text"
                        className="name-area"
                        name="name"
                        placeholder="What's your name?"
                        value={this.state.name}
                        onChange={this.handleChange}>
                    </input>
                    <select
                        className="name-area"
                        name="ticketRequest"
                        placeholder="quantity"
                        value={this.state.ticketRequest}
                        onChange={this.handleChange}> 
                            <option value={0}>Quantity</option>
                            <option value={2}>2</option>
                    </select>                     
                    <button className="submit-btn" > Submit</button>
                    </form>
                    <button className="submit-btn" onClick={this.test}> Test </button>
                    <button onClick={this.lotteryResults}>Lottery Results</button>
                    <div>
                        {this.displayWinner()}
                    </div>
            </div>
        )
    }
}
import React from 'react';
import axios from 'axios';
import $ from 'jquery'
import TicketCollection from './TicketCollection'
import img from './Images/tomorrow-tix.svg'
import './Enter.css'
//TODO
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
            draw: false,
            hide: false,
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
        console.log(this.state.entrants);
    };

    lotteryResults = () => {
        let numberOfWinners = this.state.ticketAllocation / this.state.entrants[0].ticketRequest;
        let draw = this.shuffle(this.state.entrants);
        let winners = draw.slice(0,numberOfWinners);

        console.log(winners);

        let number = new TicketCollection(...winners);
        let tickets = number.sum('ticketRequest');

        this.setState({
            draw:true, 
            ticketAllocation: this.state.ticketAllocation - tickets,
            winners: winners, 
            hide: true
        });      
    };

    displayWinner = () => {
        if(this.state.hide === true) {
            $(".form-group").hide()
            $("#button").hide()
            $("#results").hide()
        };
        
        if(this.state.draw === true) {
            return(
                <div className="results">
                    <h1>The draw has been completed</h1>
                    <h3>The winners are...</h3>
                    {this.state.winners.map(({id,name}) => {
                        return(
                            <h4 className="winners" key={id}>{name}</h4>
                        )
                    })}
                    <h3>Congratulations to you all, enjoy your show!</h3>
                </div>
            );
        };
    };

    shuffle = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while( 0 !== currentIndex){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue
        };
        return array;
    };

    render() {
        return(
            <div className="wrapper">
                <img src={img} alt="" className="header-img"/>
                 <form className="form-group" onSubmit={this.submit}>
                    <input
                        type= "text"
                        className="form-control"
                        name="name"
                        placeholder="What's your name?"
                        value={this.state.name}
                        onChange={this.handleChange}>
                    </input>
                    <select
                        className="form-control"
                        name="ticketRequest"
                        placeholder="quantity"
                        value={this.state.ticketRequest}
                        onChange={this.handleChange}> 
                            <option value={0}>How Many Tickets?</option>
                            <option value={2}>2</option>
                    </select>                     
                    <button className="btn btn-outline-secondary"id="button" >Submit</button>
                    </form>
                    {/* <button className="btn-btn-secondary" onClick={this.test}> Test </button> */}
                    <button className="btn btn-outline-dark" id="results" onClick={this.lotteryResults}>Lottery Results</button>
                    <div>
                        {this.displayWinner()}
                    </div>
            </div>
        )
    }
}
import React from 'react';
import MichaelScott from '../Images/Michael-Scott.jpg'
import JimHalpert from '../Images/Jim-Halpert.png'
import PamBeesly from '../Images/Pam-Beesly.jpg'
import DwightSchrute from '../Images/Dwight-Schrute.jpg'
import PhyllisVance from '../Images/Phyllis-Vance.jpg'
import BobVance from '../Images/Bob-Vance-Refrigeration.png'
import StanleyHudson from '../Images/Stanley-Hudson.jpg'
import OscarMartinez from '../Images/Oscar-Martinez.jpg'
import KellyKapoor from '../Images/Kelly-Kapoor.jpg'
import RyanHoward from '../Images/Ryan-Howard.jpg'
import AngelaMartin from '../Images/Angela-Martin.jpg'
import CreedBratton from '../Images/Creed-Bratton.jpg'
import MeradithPalmer from '../Images/Meradith-Palmer.jpg'
import './Lottery.css'
import Enter from '../Enter/Enter'


export default class Lottery extends React.Component{

    constructor() {
        super()
        this.state = {
            entrants: [
                    {id: 101,
                    name: 'Micheal Scott',
                    img: MichaelScott
                    },

                    {id: 102,
                    name: 'Jim Halpert',
                    img: JimHalpert
                    },

                    {id: 103,
                    name: 'Pam Beesly',
                    img: PamBeesly
                    },

                    {id: 104,
                    name: 'Dwight Schrute',
                    img: DwightSchrute
                    },

                    {id: 105,
                    name: 'Phyllis Vance',
                    img: PhyllisVance
                    },

                    {id: 106,
                    name: 'Bob Vance, Vance Refrigeration',
                    img: BobVance
                    },

                    {id: 107,
                    name: 'Stanley Hudson',
                    img: StanleyHudson
                    },

                    {id: 108,
                    name: 'Oscar Martinez',
                    img: OscarMartinez
                    },

                    {id: 109,
                    name: 'Kelly Kapoor',
                    img: KellyKapoor
                    },

                    {id: 110,
                    name: 'Ryan Howard',
                    img: RyanHoward
                    },

                    {id: 111,
                    name: 'Angela Martin',
                    img: AngelaMartin
                    },

                    {id: 112,
                    name: 'Creed Bratton',
                    img: CreedBratton
                    },

                    {id: 113,
                    name: 'Meradith Palmer',
                    img: MeradithPalmer
                    },      
            ],
            winner: [],
            reveal: false
        }
        
    }

 luckyWinner = () => {
     

    let entrants = this.state.entrants

    let randomindex = Math.floor(Math.random()*entrants.length)
    
    this.setState({
        winner: entrants[randomindex],
        reveal: true
    })
  
}

reveal = () => {
    let winner = this.state.winner
    if (this.state.reveal === true){
        return(
            <div className='reveal-winner'>
                <h1>{winner.id}</h1>
                <h3>{winner.name}</h3>
                <img className='winner-img' src={winner.img} alt=""/>
            </div>
            )
        }
     
}

    render() {
        
        
        return(
            <div className= 'wrapper'>
                <Enter/>
                <button className='btn' onClick={this.luckyWinner}>Reveal Winner</button>
                {this.reveal()}
            </div>
            
        )
    }
}
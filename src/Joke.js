import React, { Component } from 'react';
import './Joke.css';
import './fontawesomeall'

class Joke extends Component {
    constructor(props){
        super(props);
        this.addPoint = this.addPoint.bind(this);
        this.subPoint = this.subPoint.bind(this);
    }

    addPoint(){
        //add point
        this.props.add(this.props.id);
    }

    subPoint(){
        //subt point 
        this.props.sub(this.props.id);
    }

    render() {
        return (
            <div className="Joke">
                <div>
                    <button onClick={this.addPoint}><i className="fas fa-arrow-up"></i></button>
                    <span>{this.props.points}</span>
                    <button onClick={this.subPoint}><i className="fas fa-arrow-down"></i></button>
                </div>
                
                <p>{this.props.joke}</p>
                {this.props.faces(this.props.points)}
            </div>
        )
    }
}

export default Joke;
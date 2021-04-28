import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';

const jokeURL = "https://icanhazdadjoke.com/"

class Dashboard extends Component {
    static defaultProps = {
        happyFaces : [
            <i className="far fa-grin"></i>,
            <i className="far fa-grin-beam"></i>,
            <i className="far fa-grin-squint"></i>,
            <i className="far fa-grin-squint-tears"></i>
            
        ],
        sadFaces : [
            <i className="far fa-grin"></i>,
            <i className="far fa-meh"></i>,
            <i className="far fa-sad-tear"></i>,
            <i className="far fa-angry"></i>
        ]
    }
    constructor(props) {
        super(props);
        this.state = {
            jokes: [],
            rating: []
        }
        this.getJoke = this.getJoke.bind(this);
        this.add = this.add.bind(this);
        this.sub = this.sub.bind(this);
        this.faces = this.faces.bind(this);
    }

    componentDidMount() {
        for(var i=0; i<10; i++){
            this.getJoke();
        }
    }

    async getJoke() {
        const joke = await axios.get(jokeURL, { headers: { Accept: "application/json" } })

        this.setState(st => ({
            jokes: [...st.jokes, joke.data],
            rating: [...st.rating, 0]
        }))
    }

    add(id){
        const index = this.search(id, this.state.jokes);
        const newRating = this.state.rating[index] + 1;

        this.setState(st => ({
            rating: [...st.rating.slice(0,index), newRating, ...st.rating.slice(index + 1, this.state.rating.length) ]
        }))
    }

    sub(id){
        const index = this.search(id, this.state.jokes);
        const newRating = this.state.rating[index] - 1;

        this.setState(st => ({
            rating: [...st.rating.slice(0,index), newRating, ...st.rating.slice(index + 1, this.state.rating.length) ]
        }))
    }

    search(id, jokeArr){
        for(let i=0; i<jokeArr.length; i++){
            if(jokeArr[i].id === id){
                return i;
            }
        }
    }

    faces(points){
        const face = Math.floor(points/5);
        console.log(face);
        if(points >= 0){
            return this.props.happyFaces[face];
        }
    }

    render() {
        let jokes = this.state.jokes.map((e,idx) => (
            <Joke 
                key={e.id} 
                joke={e.joke} 
                add={this.add} 
                sub={this.sub} 
                faces={this.faces}
                id={e.id} 
                points={this.state.rating[idx]}
            />
        ))

        return (
            <div>
                <div>
                    Dad Jokes
                    <button onClick={this.getJoke}>New Jokes</button>
                </div>
                <div>
                    {jokes}
                </div>
            </div>
        )
    }
}

export default Dashboard;
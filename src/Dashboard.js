import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';
import './Dashboard.css';

const jokeURL = "https://icanhazdadjoke.com/"

class Dashboard extends Component {
    static defaultProps = {
        face: ['-beam', '-squint', '-squint-tears']
    }
    constructor(props) {
        super(props);
        this.state = {
            jokes: [],
            rating: [],
            isLoaded: false
        }
        this.getJoke = this.getJoke.bind(this);
        this.add = this.add.bind(this);
        this.sub = this.sub.bind(this);
    }

    async componentDidMount() {
        for (var i = 0; i < 10; i++) {
            await this.getJoke();
        }

        this.setState(st => ({isLoaded: true}))

    }

    async getJoke() {
        const joke = await axios.get(jokeURL, { headers: { Accept: "application/json" } })

        this.setState(st => ({
            jokes: [...st.jokes, joke.data],
            rating: [...st.rating, 0]
        }))
    }

    add(id) {
        const index = this.search(id, this.state.jokes);
        const newRating = this.state.rating[index] + 1;

        this.setState((st, idx) => ({
            rating: [...st.rating.slice(0, index), newRating, ...st.rating.slice(index + 1, this.state.rating.length)]
        }))
    }

    sub(id) {
        const index = this.search(id, this.state.jokes);
        const newRating = this.state.rating[index] - 1;

        this.setState(st => ({
            rating: [...st.rating.slice(0, index), newRating, ...st.rating.slice(index + 1, this.state.rating.length)]
        }))
    }

    search(id, jokeArr) {
        for (let i = 0; i < jokeArr.length; i++) {
            if (jokeArr[i].id === id) {
                return i;
            }
        }
    }

    render() {
        let jokes = this.state.jokes.map((e, idx) => (
            <Joke
                key={e.id}
                joke={e.joke}
                add={this.add}
                sub={this.sub}
                id={e.id}
                points={this.state.rating[idx]}
            />
        ))
        console.log(this.state);
        return (
            <div>
                <h1>Dad Jokes</h1>
                {this.state.isLoaded ?
                    (<div>
                        <button onClick={this.getJoke}>New Jokes</button>
                        {jokes}
                    </div>)
                    :  (<main>
                    <div id="spin"></div>
                    <h3 id="work">Work in Progress</h3>
                  </main>)
                }
            </div>
        )
    }
}

export default Dashboard;
import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './Home.css';

import {Col} from 'react-bootstrap';
import $ from 'jquery';
import Chatbot from './Chatbot';
import NavButton from './NavButton';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            chatbots: [],
            style: {
                background: 'url("images/background-main.png") bottom #fff no-repeat',
                'background-size': '100% auto'
            }
        };

        // this.toggleBotActivation = this.toggleBotActivation.bind(this);
        this.getBotData = this.getBotData.bind(this);
        this.removeBot = this.removeBot.bind(this);
    };

    getBotData(data) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch('https://udigital.botscrew.com/duplicate', {
            method: 'POST',
            headers: myHeaders,
            credentials: 'same-origin',
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((responseJson) => {

                let chatbots = [];

                responseJson.forEach(item => {
                    chatbots.push(item);
                });

                this.setState({
                    chatbots
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    removeBot(id) {

        const data = {
            botId: id
        };

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch('https://udigital.botscrew.com/delete', {
            method: 'POST',
                headers: myHeaders,
                credentials: 'same-origin',
                body: JSON.stringify(data)
        }
        )
            .then((response) => response.json())
            .then((responseJson) => {

                let chatbots = [];

                responseJson.forEach(item => {
                    chatbots.push(item);
                });

                this.setState({
                    chatbots
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        fetch('https://udigital.botscrew.com/list')
            .then((response) => response.json())
            .then((responseJson) => {

                let chatbots = [];

                responseJson.forEach(item => {
                    chatbots.push(item);
                });

                this.setState({
                    chatbots
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <div className="Home" style={this.state.style}/>
        );
    }

}

export default Home;

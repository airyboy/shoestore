import React, { Component } from 'react';
import './App.css';
import MainPage from './MainPage.js';
import { title } from '../title'

export default class App extends Component {

    componentDidMount() {
        document.title = title + ' - Главная'
    }

    render() {
        return (
            <div>
                <MainPage />
            </div>
        );
    }
}
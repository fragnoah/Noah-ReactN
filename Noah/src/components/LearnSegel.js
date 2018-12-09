import React, { Component } from 'react';
//import React from 'react';
import LearnQuestionList from './LearnQuestionList';

class LearnSegel extends Component {
//const Quest = (props) => {
    //render(props) {
    render() {
        return (
            <LearnQuestionList fromID={254} toID={300} />
        );
    }
}

export default LearnSegel;

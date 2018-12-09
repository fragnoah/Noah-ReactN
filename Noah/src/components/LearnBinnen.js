import React, { Component } from 'react';
//import React from 'react';
import LearnQuestionList from './LearnQuestionList';

class LearnBinnen extends Component {
//const Quest = (props) => {
    //render(props) {
    render() {
        return (
            <LearnQuestionList fromID={73} toID={253} />
        );
    }
}

export default LearnBinnen;

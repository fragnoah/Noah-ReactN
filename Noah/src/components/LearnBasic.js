import React, { Component } from 'react';
//import React from 'react';
import LearnQuestionList from './LearnQuestionList';

class LearnBasic extends Component {
//const Quest = (props) => {
    //render(props) {
    render() {
        return (
            <LearnQuestionList fromID={1} toID={73} />
        );
    }
}

export default LearnBasic;

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';


class Result extends Component {
    checkScore() {
         this.Ergebnis = 'leider nicht bestanden';
        if (this.props.quiz.basisScore >= 5 && this.props.quiz.spezScore >= 18) {
            this.Ergebnis = 'Glückwünsch,bestanden';
        }
    }
    render() {
        this.checkScore();
        return (
            <View style={{ flexDirection: 'column' }}>
                <Text>Ergebnis </Text>
                <Text>Basispunkte: {this.props.quiz.basisScore} von 7 </Text>
                <Text>Spezpunkte: {this.props.quiz.spezScore} von 23 </Text>
                <Text>{this.Ergebnis}</Text>
            </View>
        );
    }
}

const mapStateToProbs = state => {
    return { quiz: state.selectedFb };
};

export default connect(mapStateToProbs, actions)(Result);

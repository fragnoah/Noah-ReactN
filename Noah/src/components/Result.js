import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions';


class Result extends Component {
    checkScore() {
         this.Ergebnis = 'leider nicht bestanden';
        if (this.props.quiz.basisScore >= 5 && this.props.quiz.spezScore >= 18) {
            this.Ergebnis = 'Glückwünsch,bestanden';
        }
    }
    wrongRepeate() {
        if (this.props.quiz.wrongAns.length > 0) {
        Actions.repeat();
        } else {
           console.log('Keine falschen Fragen vorhanden');
        }
    }
    marked() {
        this.props.resetMarked();
        if (this.props.quiz.marked.length > 0) {
            Actions.mark();
            } else {
               console.log('keine Fragen makiert');
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

                <Button
                onPress={() => this.wrongRepeate()}
                title="Falsche Fragen wiederholen"
                color='#ff00ff00'
                />
                <Button
                onPress={() => this.marked()}
                title="Makierte Fragen wiederholen"
                color='#ff00ff00'
                />
            </View>
        );
    }
}

const mapStateToProbs = state => {
    return { quiz: state.selectedFb };
};

export default connect(mapStateToProbs, actions)(Result);

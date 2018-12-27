import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from '../actions';

class startPage extends Component {
    componentWillMount() {
        if (this.props.quiz.qno === 29) {
            this.props.resetFb();
        }
        if (this.props.quiz.fragebogen !== '') {
            this.props.resetDefault();
        Alert.alert(
            'Mitteilung',
            'Letzen Versuch fortsetzen?',
            [
            { text: 'Abbrechen', onPress: () => this.props.resetFb(), style: 'cancel' },
              { text: 'OK', onPress: () => Actions.quest() },
            ],
            { cancelable: false }
          );
        }
    }

    getFb(fb) {
        this.props.resetFb();
        this.props.selectFb(fb);
        Actions.quest();
    }
    toTest() {
        Actions.result();
    }
    render() {
        return (
            <View>
                <Text>
                    Start Seite. 
                    Nachfolgende Szene ist die QuestionPage für ein Fragebogen
                </Text>
                <Button
                onPress={() => this.getFb('fb1')}
                title="Fragebogen 1"
                color="#841584"
                />
                <Button
                onPress={() => this.getFb('fb2')}
                title="Fragebogen 2"
                color="#841584"
                />
            </View>
        );
    }
}
const mapStateToProbs = state => {
    return { quiz: state.selectedFb };
};

export default connect(mapStateToProbs, actions)(startPage);


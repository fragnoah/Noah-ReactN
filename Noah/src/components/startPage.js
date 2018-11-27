import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import actions from '../actions/actions';

class startPage extends Component {
    
    
    getFb1() {
        this.props.fb1;
        Actions.QuestionPage();
    }
    getFb2() {
        this.props.fb2;
        Actions.QuestionPage();
    }
    render() {
        return (
            <View>
                <Text>
                Start Seite. 
                Nachfolgende Szene ist die QuestionPage für ein Fragebogen
                </Text>
                <Button
                onPress={() => this.getFb1()}
                title="Fragebogen 1"
                color="#841584"
                />
                <Button
                onPress={() => this.getFb2()}
                title="Fragebogen 2"
                color="#841584"
                />
        </View>
        );
    }
}
const mapStateToProbs = ({ quiz }) => {
    return { pickFb: quiz.pickFB };
};

export default connect(mapStateToProbs, actions)(startPage);

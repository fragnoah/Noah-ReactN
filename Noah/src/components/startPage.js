import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from '../actions';

class startPage extends Component {
    
 
    getFb1() {
        const fb = 'fb1';
        this.props.selectFb(fb);
        Actions.quest();
    }
    getFb2() {
        const fb = 'fb2';
        this.props.selectFb(fb);
        Actions.quest();
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
                <Text>
                    abc
                    {console.log(this.props)}
                </Text>
            </View>
        );
    }
}
const mapStateToProbs = state => {
    return { quiz: state.selectedFb };
};

export default connect(mapStateToProbs, actions)(startPage);


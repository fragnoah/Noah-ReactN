import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

class startPage extends Component {
    render() {
        return (
            <View>
            <Text>
                Start Seite. 
                Nachfolgende Szene ist die QuestionPage für ein Fragebogen
            </Text>
            <Button
                onPress={() => Actions.QuestionPage()}
                title="Test-Fragebogen"
                color="#841584"
            />
        </View>
        );
    }
}
export default startPage;

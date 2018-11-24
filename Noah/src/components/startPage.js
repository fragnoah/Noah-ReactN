import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

class startPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fb: 0
        };
    // hier muss vermutlich redux angewannt werden
    }
    getFb1() {
        this.setState({
            fb: 'fb1'
        });
        Actions.QuestionPage();
    }
    getFb2() {
        this.setState({
            fb: 'fb2'
        });
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
export default startPage;

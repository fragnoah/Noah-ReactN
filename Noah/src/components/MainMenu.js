import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from './common/Button';
import { toTests, toLearn } from '../actions';


class MainMenu extends Component {
    render() {
        return (
            <View>
                <Button onPress={toTests} children="Prüfungsmodus" />
                <Button onPress={toLearn} children="Lernmodus" />
            </View>
        );
    }
}

export default MainMenu;

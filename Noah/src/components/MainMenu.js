import React, { Component } from 'react';
import { View } from 'react-native';
import { ButtonWithImage } from './common';
import { toTests, toLearn } from '../actions';


class MainMenu extends Component {
    render() {
        return (
            <View>
                <ButtonWithImage
                    onPress={toTests}
                    buttonText="Prüfungsmodus"
                    imgLeft={require('../assets/img/test.png')}
                    buttonStyle={{ padding: 5 }}
                />
                
                <ButtonWithImage
                    onPress={toLearn} 
                    buttonText="Lernmodus" 
                    imgLeft={require('../assets/img/book.png')}
                    buttonStyle={{ padding: 5 }}
                />
            </View>
        );
    }
}

export default MainMenu;

import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, ButtonWithImage } from './common';
import { toTests, toLearn } from '../actions';


class MainMenu extends Component {
    render() {
        return (
            <View>
                <ButtonWithImage
                    onPress={toTests}
                    buttonText="Prüfungsmodus"
                    imgLeft={require('../assets/img/test.png')}
                />
                
                <ButtonWithImage
                    onPress={toLearn} 
                    buttonText="Lernmodus" 
                    imgLeft={require('../assets/img/book.png')}
                />
            </View>
        );
    }
}

export default MainMenu;

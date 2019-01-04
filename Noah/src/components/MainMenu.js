import React, { Component } from 'react';
import { View, Platform, ImageBackground } from 'react-native';
import { ButtonWithImage } from './common';
import { toTests, toLearn } from '../actions';
import { iosFix } from '../utils';

class MainMenu extends Component {
    renderContent() {
        console.log(this.props);
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

    render() {
        if (Platform.OS === 'ios') {
            return (
                <ImageBackground
                    source={iosFix.path}
                    style={iosFix.style}
                >
                    {this.renderContent()}
                </ImageBackground>
            );
        }
        return (
            this.renderContent()
        );
    }
}

export default MainMenu;

import React, { Component } from 'react';
import { View, Platform, ImageBackground } from 'react-native';
import { ButtonWithImage } from './common';
import { iosFix } from '../utils';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MainMenu extends Component {
    renderContent() {
        console.log(this.props);
        return (
            <View>
                <ButtonWithImage
                    onPress={actions.toTests}
                    buttonText="Prüfungsmodus"
                    imgLeft={require('../assets/img/test.png')}
                    buttonStyle={{ padding: 5 }}
                />
                
                <ButtonWithImage
                    onPress={actions.toLearn} 
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

const mapStateToProbs = state => {
    return { quiz: state.selectedFb };
};

export default connect(mapStateToProbs, actions)(MainMenu);


import React, { Component } from 'react';
import { ScrollView, Platform, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { ButtonWithImage } from './common';
import { iosFix } from '../utils';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MainMenu extends Component {
    resetFragen() {
        this.props.resetKatalog();
        console.log('reset');
        actions.toLearn();
        console.log(this.props);
    }
    renderContent() {
        return (
            <ScrollView>
                <TouchableOpacity onPress={() => this.resetFragen()}>
                    <Image source={require('../assets/img/Fragenkatalog.png')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={actions.toVideos}>
                    <Image source={require('../assets/img/Videos.png')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={actions.toTests}>
                    <Image source={require('../assets/img/Fragebogen.png')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={actions.toTests}>
                    <Image source={require('../assets/img/Pruefungsmodus.png')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={actions.toGlossar}>
                    <Image source={require('../assets/img/Glossar.png')} />
                </TouchableOpacity>
            </ScrollView>
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


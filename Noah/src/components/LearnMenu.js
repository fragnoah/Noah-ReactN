import React, { Component } from 'react';
import { ScrollView, Platform, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { Card, ButtonWithImage } from './common';
import * as actions from '../actions';
import { iosFix } from '../utils';
import { menuStyle } from './styleSheets';

class LearnMenu extends Component {
    getKatalog(katalog) {
        this.props.selectKatalog(katalog);
        actions.toKatalog();
    }
    
    renderContent() {
        const { 
            cardStyle,
            cardTitle, 
            bigButtonStyle,
            smallButtonStyle,
            imageStyle
        } = menuStyle;
        return (
            <ScrollView>
                 <TouchableOpacity onPress={() => this.getKatalog('Basis')}>
                    <Image source={require('../assets/img/Basisfragen.png')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.getKatalog('Binnen')}>
                    <Image source={require('../assets/img/Binnenfragen.png')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.getKatalog('Segeln')}>
                    <Image source={require('../assets/img/Segelfragen.png')} />
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

export default connect(mapStateToProbs, actions)(LearnMenu);

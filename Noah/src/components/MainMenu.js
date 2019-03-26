import React, { Component } from 'react';
import { ScrollView, Platform, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { ButtonWithImage } from './common';
import { iosFix } from '../utils';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import * as actions from '../actions';

class MainMenu extends Component {
    resetFragen() {
        this.props.resetKatalog();
        console.log('reset');
        actions.toLearn();
        console.log(this.props);
    }
    renderContent() {
        const width = Dimensions.get('window').width;
        return (
            <ScrollView>
                <TouchableOpacity onPress={() => this.resetFragen()}>
                    <Image source={require('../assets/img/Fragenkatalog.png')} style={{ width: '93%', alignItems: 'center', justifyContent: 'center', flex: 1 }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={actions.toVideos}>
                    <Image source={require('../assets/img/Videos.png')} style={{ width: width, marginTop: 50, }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={actions.toTests}>
                    <Image source={require('../assets/img/Fragebogen.png')} style={{ width: width }}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={actions.toTests}>
                    <Image source={require('../assets/img/Pruefungsmodus.png')} style={{ width: width }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={actions.toGlossar}>
                    <Image source={require('../assets/img/Glossar.png')} style={{ width: width }} />
                </TouchableOpacity>
            </ScrollView>
        );
    }

    render() {
        return (
            this.renderContent()
        );
    }
}

const mapStateToProbs = state => {
    return { quiz: state.selectedFb };
};

export default connect(mapStateToProbs, actions)(MainMenu);


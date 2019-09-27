import React, { Component } from 'react';
import { ScrollView, Platform, ImageBackground, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
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
        const width = Dimensions.get('window').width;
        const anpass = width * 0.93;

        const styles = StyleSheet.create({
            image: {
                width: '100%',
                height: 220,
                marginTop: 30,
                resizeMode: 'contain' 
            },
            container: {
                width: anpass,

            },
            logo: {
                width: 100,
                height: 80
            },
            first: {
                width: '100%',
                height: 220,
            }
        });
        
        return (
            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => actions.toMain()} >
                    <Image source={require('../assets/img/Logo.png')} style={styles.logo} />
                </TouchableOpacity>

                 <TouchableOpacity onPress={() => this.getKatalog('Basis')} style={styles.container}>
                    <Image source={require('../assets/img/Basisfragen.png')} style={styles.first} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.getKatalog('Binnen')} style={styles.container}>
                    <Image source={require('../assets/img/Binnenfragen.png')} style={styles.image} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.getKatalog('Segeln')} style={styles.container}>
                    <Image source={require('../assets/img/Segelfragen.png')} style={styles.image} />
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

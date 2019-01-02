import React, { Component } from 'react';
import { ScrollView, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Card, ButtonWithImage } from './common';

class startPage extends Component {
    componentWillMount() {
        if (this.props.quiz.qno !== 29 && this.props.quiz.fragebogen !== '') {
            this.props.resetDefault();
            Alert.alert(
                'Mitteilung',
                'Letzen Versuch fortsetzen?',
                [
                { text: 'Abbrechen', onPress: () => this.props.resetFb(), style: 'cancel' },
                { text: 'OK', onPress: () => actions.toQuestions() },
                ],
                { cancelable: false }
            );
            }
        if (this.props.quiz.qno === 29) {
            this.props.resetFb();
        } 
    }   
    getFb(fb) {
        this.props.resetFb();
        this.props.selectFb(fb);
        actions.toQuestions();
    }

    render() {
        const { 
            cardStyle,
            cardTitle,             
            smallButtonStyle,
            bigButtonStyle,
            imageStyle,
            noImageStyle
        } = styles;

        return (
            <ScrollView>
                <Card cardStyle={cardStyle}>
                    <Text style={cardTitle}>vorgefertigter Test </Text>
                    <ButtonWithImage 
                        buttonText="Fragebogen 1" 
                        onPress={() => this.getFb('fb1')}
                        buttonStyle={bigButtonStyle} 
                        imageStyle={noImageStyle}
                    />
                    <ButtonWithImage 
                        buttonText="Fragebogen 2" 
                        onPress={() => this.getFb('fb2')} 
                        buttonStyle={smallButtonStyle} 
                        imageStyle={noImageStyle}
                    />

                </Card>
                <Card cardStyle={cardStyle}>
                    <Text style={cardTitle}>Test generieren</Text>
                    <ButtonWithImage 
                        buttonText="Zufallsfragen" 
                        onPress={() => this.getFb('random')}
                        buttonStyle={bigButtonStyle} 
                        imageStyle={noImageStyle}
                    />
                </Card>  

                <Card cardStyle={cardStyle}>
                    <Text style={cardTitle}>Statistik</Text>
                    <ButtonWithImage 
                        buttonText="Statistik Test" 
                        onPress={actions.toResult} 
                        buttonStyle={bigButtonStyle} 
                        imageStyle={imageStyle}
                        imgLeft={require('../assets/img/statistics.png')}
                    />
                </Card>
            </ScrollView>
        );
    }
}

const styles = {
    cardStyle: {
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'rgba(255,255,255, 0.3)',
    },
    cardTitle: {
        fontSize: 20,
        opacity: 1
    },
    smallButtonStyle: {
        padding: 0,
        marginLeft: 20,
        marginRight: 2,
        opacity: 1,
        marginTop: 5
    },
    bigButtonStyle: {
        padding: 0,
        marginLeft: 20,
        marginRight: 2,
        opacity: 1,
    },
    imageStyle: {
        height: 50,
        width: 50
    },
    noImageStyle: {
        height: 0,
        width: 50
    }
};

const mapStateToProbs = state => {
    return { quiz: state.selectedFb };
};

export default connect(mapStateToProbs, actions)(startPage);


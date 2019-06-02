import React, { Component } from 'react';
import { ScrollView, Text, Alert, Platform, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Card, ButtonWithImage } from './common';
import { iosFix, debug } from '../utils';
import { menuStyle } from './styleSheets';
import * as img from '../assets/img';


 /**
  * @brief StartPage des Prüfungsmodus
  * @author Timur Burkholz
  */
class StartPage extends Component {
    /** 
     * Beim aufrufen der Page
     * Überprüfung, ob eine Prüfung im Redux-Store gespeichert ist
     */
    componentWillMount() {
        if (this.props.quiz.learnqno !== 29 && this.props.quiz.learnfragebogen !== '') {
            this.props.resetLearnDefault();
            Alert.alert(
                'Mitteilung',
                'Möchtest du deinen letzten Fragebogen fortsetzen?',
                [
                { text: 'Abbrechen', onPress: () => this.props.resetLearnFb(), style: 'cancel' },
                { text: 'OK', onPress: () => actions.toLearnExam() },
                ],
                { cancelable: false }
            );
            }
        if (this.props.quiz.learnqno === 29) {
            this.props.resetLearnFb();
        } 
    }
    /**
     * Speichert ausgewählten Fragebogen in Redux-State
     * @param {*} fb 
     */   
    getFb(fb) {
        this.props.resetLearnFb();
        this.props.selectLearnFb(fb);
        console.log(this.props);
        actions.toLearnExam();
    }

    renderDebug() {
        if (debug) {
            const { 
                cardStyle,
                cardTitle,      
                bigButtonStyle,
                imageStyle,             
                smallButtonStyle,                
                noImageStyle
            } = menuStyle;
            return (
                <Card cardStyle={cardStyle}>
                    <Text style={cardTitle}>For Debug</Text>
                    <ButtonWithImage 
                        buttonText="Statistik Test" 
                        onPress={actions.toResult} 
                        buttonStyle={bigButtonStyle} 
                        imageStyle={imageStyle}
                        imgLeft={img.statistic}
                    />   
                                    
                    <ButtonWithImage 
                        buttonText="Test" 
                        onPress={() => this.getFb('debug')} 
                        buttonStyle={smallButtonStyle} 
                        imageStyle={noImageStyle}
                    /> 
                                      
                </Card>
            
            );
        }
    }

    renderContent() {
        const { 
            cardStyle,
            cardTitle,             
            smallButtonStyle,
            bigButtonStyle,
            noImageStyle
        } = menuStyle;

        return (
            <ScrollView>
                <Card cardStyle={cardStyle}>
                    <Text style={cardTitle}>Feste Fragebögen</Text>
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
                    <Text style={cardTitle}>Zufallsfragen generieren</Text>
                    <ButtonWithImage 
                        buttonText="Zufallsfragen" 
                        onPress={() => this.getFb('random')}
                        buttonStyle={bigButtonStyle} 
                        imageStyle={noImageStyle}
                    />
                </Card>  
                
                {this.renderDebug()}

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
    return { quiz: state.learn };
};

export default connect(mapStateToProbs, actions)(StartPage);


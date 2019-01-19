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
  * @author Timur Burkholz, Yen Luu
  */
class StartPage extends Component {
    /** 
     * Beim aufrufen der Page
     * Überprüfung, ob eine Prüfung im Redux-Store gespeichert ist
     */
    componentWillMount() {
        if (this.props.quiz.qno !== 29 && this.props.quiz.fragebogen !== '') {
            this.props.resetDefault();
            Alert.alert(
                'Fortsetzen',
                'Möchtest du deine letzte Prüfung fortsetzen?',
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
    /**
     * Speichert ausgewählten Fragebogen in Redux-State
     * @param {*} fb 
     */   
    getFb(fb) {
        this.props.resetFb();
        this.props.selectFb(fb);
        actions.toQuestions();
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
                    <Text style={cardTitle}>Prüfungsmodus starten</Text>
                    <ButtonWithImage 
                        buttonText="Prüfungsbogen Variante 1" 
                        onPress={() => this.getFb('fb1')}
                        buttonStyle={bigButtonStyle} 
                        imageStyle={noImageStyle}
                    />
                    <ButtonWithImage 
                        buttonText="Prüfungsbogen Variante 2" 
                        onPress={() => this.getFb('fb2')} 
                        buttonStyle={smallButtonStyle} 
                        imageStyle={noImageStyle}
                    />
                    <ButtonWithImage 
                        buttonText="Prüfungsbogen Variante 3" 
                        onPress={() => this.getFb('fb3')} 
                        buttonStyle={smallButtonStyle} 
                        imageStyle={noImageStyle}
                    />
                    <ButtonWithImage 
                        buttonText="Prüfungsbogen Variante 4" 
                        onPress={() => this.getFb('fb4')} 
                        buttonStyle={smallButtonStyle} 
                        imageStyle={noImageStyle}
                    <ButtonWithImage 
                        buttonText="Prüfungsbogen Variante 5" 
                        onPress={() => this.getFb('fb5')} 
                        buttonStyle={smallButtonStyle} 
                        imageStyle={noImageStyle}
                    />
                          <ButtonWithImage 
                        buttonText="Prüfungsbogen Variante 6" 
                        onPress={() => this.getFb('fb6')}
                        buttonStyle={bigButtonStyle} 
                        imageStyle={noImageStyle}
                    />
                    <ButtonWithImage 
                        buttonText="Prüfungsbogen Variante 7" 
                        onPress={() => this.getFb('fb7')} 
                        buttonStyle={smallButtonStyle} 
                        imageStyle={noImageStyle}
                    />
                    <ButtonWithImage 
                        buttonText="Prüfungsbogen Variante 8" 
                        onPress={() => this.getFb('fb8')} 
                        buttonStyle={smallButtonStyle} 
                        imageStyle={noImageStyle}
                    />
                    <ButtonWithImage 
                        buttonText="Prüfungsbogen Variante 9" 
                        onPress={() => this.getFb('fb9')} 
                        buttonStyle={smallButtonStyle} 
                        imageStyle={noImageStyle}
                    <ButtonWithImage 
                        buttonText="Prüfungsbogen Variante 10" 
                        onPress={() => this.getFb('fb10')} 
                        buttonStyle={smallButtonStyle} 
                        imageStyle={noImageStyle}
                    />
                    />

                </Card>
                <Card cardStyle={cardStyle}>
                    <Text style={cardTitle}>Zufallstest starten</Text>
                    <ButtonWithImage 
                        buttonText="Zufälliger Prüfungsbogen" 
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
    return { quiz: state.selectedFb };
};

export default connect(mapStateToProbs, actions)(StartPage);


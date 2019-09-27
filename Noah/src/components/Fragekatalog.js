import React, { Component } from 'react';
import { 
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image
    } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import FlashMessage from 'react-native-flash-message';
import jsondata from '../assets/datasrc/Fragenpool.json';
import { Card, ButtonWithImage } from './common';
import * as actions from '../actions';
import {  
    questionButtonStyle, 
    questionCardStyle, 
    userMessage,
} from './styleSheets';
import { debug } from '../utils';


/**
 * Fragenkatalog
 * @author Timur Burkholz
 */
class Fragekatalog extends Component {
    constructor(props) {
        super(props);
        let auswahl = this.props.quiz.auswahlKatalog;
        let ids = [];
        this.state = {
            lighted: false,
            klicked: false
        };
        if (this.props.quiz.katalog === 'Basis') {
            this.props.resetIds();
            Actions.refresh({ key: 'katalog', title: 'Basis' });
            for (let i = 1; i <= 72; i++) {
                ids.push(i);
            }
            this.props.safeIds(ids);
        }
        if (this.props.quiz.katalog === 'Binnen') {
            this.props.resetIds();
            for (let i = 73; i <= 253; i++) {
                ids.push(i);
            }
            console.log('binnen');
            console.log(ids);
            this.props.safeIds(ids);
        }
        if (this.props.quiz.katalog === 'Segeln') {
            this.props.resetIds();
            for (let i = 254; i <= 300; i++) {
                ids.push(i);
                }
            this.props.safeIds(ids);
        }
        console.log(auswahl);
        this.arrnew = jsondata.filter(val => {
            return ids.includes(val.id);
            });            
    }
    /**
     * Drücken des Buttons-Zurück
     */
    prev() {
        if (this.props.quiz.frage >= 1) {
            this.props.back();
            this.klicked = false;
        }
    }
    /**
     * Drücken des Buttons-Weiter
     */
    next() {
        if (this.props.quiz.frage < this.arrnew.length - 1) {
        if (this.state.klicked === true) {
                this.setState({
                    klicked: false
                });
                this.props.forward();
            }
        else {
            this.setState({
                klicked: true
            });
        }
    }
        if (this.props.quiz.frage === this.arrnew.length - 1) {
            this.setState({
                klicked: true
            });
            }
        
    }


    renderDebug() {
        if (debug === true) {
            return (
                <View style={{ flexDirection: 'column' }}>
                <Text>
                    Kategorie: {this.arrnew[this.props.quiz.frage].category}
                </Text>
                <Text>
                    Korrekteantwort: {this.arrnew[this.props.quiz.frage].correctAnswer}
                </Text>
                <Text>
                    {console.log(this.props)}
                </Text>
                <Text>
                    Frage: {this.props.quiz.frage}
                </Text>
            </View>
            );
        }
    }
    renderQuestion() {
        const style = StyleSheet.create({
            questTextTop: {
                textAlign: 'center',
                color: 'black',
                fontSize: 20,
                paddingTop: 5,
                paddingBottom: 5,
                fontWeight: 'bold',
                marginTop: 30
                },
            questText: {
            textAlign: 'center',
            color: 'black',
            fontSize: 20,
            paddingTop: 0,
            paddingBottom: 5,
            fontWeight: 'bold',
            }
            });
            const encodedData = this.arrnew[this.props.quiz.frage].image;
            if (encodedData) {
                return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={style.questTextTop}>Frage {this.arrnew[this.props.quiz.frage].id}</Text>
                    <Text style={style.questText}>{this.arrnew[this.props.quiz.frage].frageText}</Text>
                    <Image style={{ height: 80, width: '100%', resizeMode: 'contain' }} source={{ uri: encodedData }} />
                </View>
        );
        }
        else {
        return (
        <View>
            <Text style={style.questTextTop}>Frage {this.arrnew[this.props.quiz.frage].id}</Text>
            <Text style={style.questText}>{this.arrnew[this.props.quiz.frage].frageText}</Text>
        </View>
        )}
    }
    renderAnswer() {
        const styles = StyleSheet.create({
            newText: {
                textAlign: 'center',
                color: 'rgba(123,159,217, 1)',
                fontSize: 20,
                paddingTop: 5,
                paddingBottom: 5,
                fontWeight: 'bold',
                paddingLeft: 20,
                paddingRight: 20
                },

            newTextTop: {
                textAlign: 'center',
                color: 'rgba(123,159,217, 1)',
                fontSize: 20,
                paddingTop: 0,
                paddingBottom: 5,
                fontWeight: 'bold',
                marginTop: 30,
                paddingLeft: 20,
                paddingRight: 20
                }
            });
        let correct = '';
            switch (this.arrnew[this.props.quiz.frage].correctAnswer) {
            case 'option1':
                correct = this.arrnew[this.props.quiz.frage].options.option1;
                break;
            case 'option2':
                correct = this.arrnew[this.props.quiz.frage].options.option2;
                break;
            case 'option3':
                correct = this.arrnew[this.props.quiz.frage].options.option3;
                break;
            case 'option4':
                correct = this.arrnew[this.props.quiz.frage].options.option4;
                break;
            default:
                correct = '';
            }

        if (this.state.klicked === true) {
            return (
                <View>
                    <Text style={styles.newTextTop}>Antwort:</Text>
                    <Text style={styles.newText}>{correct}</Text>                
                </View>
            );
        }
    }
    renderNextButton() {
        const { 
            navButtonImageStyle, 
            navButtonStyle,  
            navTextStyle2 
        } = questionButtonStyle;

        if (this.props.quiz.frage < this.arrnew.length - 1) {
        return (
        <ButtonWithImage
            onPress={() => this.next()}
            buttonText="Nächste"
            imgRight={require('../assets/img/arrowRight.png')}
            imageStyle={navButtonImageStyle}
            buttonStyle={navButtonStyle}
            textStyle={navTextStyle2}
            removeEmptyImage
        />
        );
        }
        if (this.props.quiz.frage === this.arrnew.length - 1 && this.state.klicked !== true) {
            return (
            <ButtonWithImage
                onPress={() => this.next()}
                buttonText="Nächste"
                imgRight={require('../assets/img/arrowRight.png')}
                imageStyle={navButtonImageStyle}
                buttonStyle={navButtonStyle}
                textStyle={navTextStyle2}
                removeEmptyImage
            />
            );
        }
    }
    
    renderContent() {
        const { 
            navButtonImageStyle, 
            navButtonStyle, 
            navTextStyle,  
        } = questionButtonStyle;
        return (
            <View style={{ flex: 1 }}>
                <ScrollView
                        style={{ 
                            backgroundColor: 'transparent',
                            /*
                            paddingTop: 2,
                            marginLeft: 2,
                            marginRight: 2
                            */
                        }}
                >  
                    {this.renderQuestion()}
                    {this.renderAnswer()}
                </ScrollView>    

                <Card cardStyle={questionCardStyle.NewNavCardStyle}>
                    <ButtonWithImage
                        onPress={() => this.prev()}
                        buttonText="Zurück"
                        disabled={this.props.quiz.frage === 0}
                        imgLeft={require('../assets/img/arrowLeft.png')}
                        imageStyle={navButtonImageStyle}
                        buttonStyle={navButtonStyle}
                        textStyle={navTextStyle}
                        removeEmptyImage
                    />
                    
                    {this.renderNextButton()}
                </Card>

                {this.renderDebug()}

                    <FlashMessage 
                        style={userMessage.flashMessage} 
                        ref="myLocalFlashMessage" 
                        position="top"
                        floating={true} 
                    />
        
            </View>
             
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

export default connect(mapStateToProbs, actions)(Fragekatalog);

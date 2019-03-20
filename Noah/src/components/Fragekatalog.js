import React, { Component } from 'react';
import { 
    View,
    Text,
    ScrollView,
    Platform,
    ImageBackground
    } from 'react-native';
import { connect } from 'react-redux';
import RadioForm, { 
   /* RadioButtonLabel, 
    RadioButtonInput, 
    RadioButton */
} from 'react-native-simple-radio-button';
import Highlighter from 'react-native-highlight-words';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import jsondata from '../assets/datasrc/Fragenpool.json';
import { Card, CardSection, ImageCardSection, ButtonWithImage, ImageButton } from './common';
import * as actions from '../actions';
import { 
    radioButtonStyle, 
    questionButtonStyle, 
    questionCardStyle, 
    userMessage,
    highlighter
} from './styleSheets';
import { iosFix, debug, canHighlight } from '../utils';
import * as img from '../assets/img';

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
        };
        if (this.props.quiz.katalog === 'Basis') {
            for (let i = 1; i <= 72; i++) {
                ids.push(i);
            }
            this.props.safeIds(ids);
        }
        if (this.props.quiz.katalog === 'Binnen') {
            for (let i = 73; i <= 253; i++) {
                ids.push(i);
            }
            console.log('binnen');
            console.log(ids);
            this.props.safeIds(ids);
        }
        if (this.props.quiz.katalog === 'Segeln') {
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
        }
    }
    /**
     * Drücken des Buttons-Weiter
     */
    next() {
            if (this.props.quiz.frage < this.arrnew.length - 1) {
                this.props.forward();
            }
    }
    /**
     * Auswahl einer Antwort mit Radiobutton -> Speicherung in Redux-State
     * @param ans 
     */
    /*
    answer(ans) {
        if (this.props.quiz.arr[this.props.quiz.qno] === undefined) {
            this.props.selectAnswer(ans);
        }
        if (this.props.quiz.arr[this.props.quiz.qno] !== ans) {
            this.props.updateAnswer(ans, this.props.quiz.qno);
            }
    }
    /**
     * markieren einer Frage
     
    markQuestion() {
        if (this.props.quiz.marked.includes(this.props.quiz.qno) === true) {
            this.props.unmark(this.props.quiz.qno);
            showMessage({
                message: 'Hinweis',
                description: 'Frage nicht mehr markiert',
                type: 'success',
                icon: 'success'
            });
        } else {
            this.props.mark(this.props.quiz.qno);
            showMessage({
                message: 'Hinweis',
                description: 'Frage wurde markiert',
                type: 'success',
                icon: 'success'
            });
        }
    }
    doHighlight() {
        this.setState({
            lighted: true
        });
    }

    undoHighlight() {
        this.setState({
            lighted: false
        });
    }
    */
    renderHighlightButton() {
        const { markButtonStyle, markButtonImageStyle } = questionButtonStyle;

        if (canHighlight) {
            if (this.state.lighted) {
                return (
                    <ImageButton
                        //onPress={() => this.undoHighlight()}
                        onPress={console.log("fehlt")} 
                        img={img.highlighted}
                        buttonStyle={markButtonStyle} 
                        imageStyle={markButtonImageStyle}
                    />
                );            
            }
            return (
                <ImageButton
                    //onPress={() => this.doHighlight()}
                    onPress={console.log("fehlt")} 
                    img={img.highlight}
                    buttonStyle={markButtonStyle} 
                    imageStyle={markButtonImageStyle}
                />  
            );
        }         
    }
    
    renderMarkButton() {
        const { markButtonStyle, markButtonImageStyle } = questionButtonStyle;
        if (this.props.quiz.marked.includes(this.props.quiz.qno)) {
            return (
                <ImageButton
                    //onPress={() => this.markQuestion()}
                    onPress={console.log("fehlt")}                    
                    img={img.marked}
                    buttonStyle={markButtonStyle} 
                    imageStyle={markButtonImageStyle}
                />
            );            
        } 
        return (
            <ImageButton
                //onPress={() => this.markQuestion()} 
                onPress={console.log("fehlt")} 
                img={img.mark}
                buttonStyle={markButtonStyle} 
                imageStyle={markButtonImageStyle}
            />  
        );         
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
    
    renderContent() {
        /*
        let highlight = ['abc'];
        switch (this.arrnew[this.props.quiz.qno].highlightWords[0]) {
            case 'option1':
                highlight[0] = this.arrnew[this.props.quiz.frage].options.option1;
                break;
            case 'option2':
                highlight[0] = this.arrnew[this.props.quiz.frage].options.option2;
                break;
            case 'option3':
                highlight[0] = this.arrnew[this.props.quiz.frage].options.option3;
                break;
            case 'option4':
                highlight[0] = this.arrnew[this.props.quiz.frage].options.option4;
                break;
            default:
                highlight = this.arrnew[this.props.quiz.frage].highlightWords;
            } 
*/
        const { 
            navButtonImageStyle, 
            navButtonStyle, 
            navTextStyle, 
            navTextStyle2 
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
                    <Card cardStyle={questionCardStyle.cardStyle}>
                        <ImageCardSection 
                            style={questionCardStyle.questionSection}
                            imgStyle={questionCardStyle.imgStyle} 
                            id={this.arrnew[this.props.quiz.frage].id} 
                            text={this.arrnew[this.props.quiz.frage].frageText} 
                            image={this.arrnew[this.props.quiz.frage].image}
                           // progress={[this.props.quiz.qno + 1, ' / 30']}
                        />                
                    
                    </Card>
                </ScrollView>    

                <Card cardStyle={questionCardStyle.navCardStyle}>
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

                    
                    <ButtonWithImage
                        onPress={() => this.next()}
                        buttonText="Nächste"
                        disabled={this.props.quiz.frage === this.arrnew.length}
                        imgRight={require('../assets/img/arrowRight.png')}
                        imageStyle={navButtonImageStyle}
                        buttonStyle={navButtonStyle}
                        textStyle={navTextStyle2}
                        removeEmptyImage
                    />
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

export default connect(mapStateToProbs, actions)(Fragekatalog);

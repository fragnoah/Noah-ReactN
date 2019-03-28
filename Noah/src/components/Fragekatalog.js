import React, { Component } from 'react';
import { 
    View,
    Text,
    ScrollView,
    Platform,
    ImageBackground,
    StyleSheet,
    Image
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
import { Actions } from 'react-native-router-flux';
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
        if (this.state.klicked === true) {
            if (this.props.quiz.frage < this.arrnew.length - 1) {
                this.setState({
                    klicked: false
                });
                this.props.forward();
            }
        }
        else {
            this.setState({
                klicked: true
            });
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
        /*   if (this.state.lighted) {
                return (
                    <ImageButton
                        //onPress={() => this.undoHighlight()}
                        onPress={console.log('fehlt')} 
                        img={img.highlighted}
                        buttonStyle={markButtonStyle} 
                        imageStyle={markButtonImageStyle}
                    />
                );            
            }
        */
            return (
                <ImageButton
                    //onPress={() => this.doHighlight()}
                    onPress={console.log('fehlt')} 
                    img={img.highlight}
                    buttonStyle={markButtonStyle} 
                    imageStyle={markButtonImageStyle}
                />  
            );
        }         
    }
    
    renderMarkButton() {
        const { markButtonStyle, markButtonImageStyle } = questionButtonStyle;
        /*if (this.props.quiz.marked.includes(this.props.quiz.qno)) {
            return (
                <ImageButton
                    //onPress={() => this.markQuestion()}
                    onPress={console.log('fehlt')}                    
                    img={img.marked}
                    buttonStyle={markButtonStyle} 
                    imageStyle={markButtonImageStyle}
                />
            );            
        } 
        */
        return (
            <ImageButton
                //onPress={() => this.markQuestion()} 
                onPress={console.log('fehlt')} 
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
    renderQuestion() {
        const style = StyleSheet.create({
            questText: {
                textAlign: 'center',
                color: 'black',
                fontSize: 20,
                paddingTop: 5,
                paddingBottom: 5,
                fontWeight: 'bold'
                }
            });
            const encodedData = this.arrnew[this.props.quiz.frage].image;
        return (
            <View>
                <Text style={style.questText}>Frage {this.arrnew[this.props.quiz.frage].id}</Text>
                <Text style={style.questText}>{this.arrnew[this.props.quiz.frage].frageText}</Text>
                <Image style={questionCardStyle.imgStyle} source={{ uri: `data:image/gif;base64,${encodedData}` }} />
            </View>
        );
    }
    renderAnswer() {
        const styles = StyleSheet.create({
            newText: {
                textAlign: 'center',
                color: 'rgba(133,187,243, 0.5)',
                fontSize: 20,
                paddingTop: 5,
                paddingBottom: 5,
                fontWeight: 'bold'
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
                    <Text style={styles.newText}>Antwort:</Text>
                    <Text style={styles.newText}>{correct}</Text>                
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
                    <Card cardStyle={questionCardStyle.NewCardStyle}>
                        <ImageCardSection 
                            style={questionCardStyle.newQuestionSection}
                            imgStyle={questionCardStyle.imgStyle} 
                            id={this.arrnew[this.props.quiz.frage].id} 
                            text={this.arrnew[this.props.quiz.frage].frageText} 
                            image={this.arrnew[this.props.quiz.frage].image}
                           // progress={[this.props.quiz.qno + 1, ' / 30']}
                        />
                    </Card>
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
                    
                    {this.renderMarkButton()}
                    {this.renderHighlightButton()}
                    
                    <ButtonWithImage
                        onPress={() => this.next()}
                        buttonText="Nächste"
                        disabled={this.props.quiz.frage === this.arrnew.length - 1}
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
        return (
            this.renderContent()
        );
    }
}

const mapStateToProbs = state => {
    return { quiz: state.selectedFb };
};

export default connect(mapStateToProbs, actions)(Fragekatalog);

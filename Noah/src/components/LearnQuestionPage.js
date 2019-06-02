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
import * as fest from '../assets/datasrc/StandardFB';

/**
 * Die eigentliche Prüfungsseite
 * @author Timur Burkholz
 */
class LearnQuestionPage extends Component {
    constructor(props) {
        super(props);
        this.basisScore = 0;
        this.spezScore = 0;
        let auswahl = this.props.quiz.learnauswahl;
        this.state = {
            lighted: false,
        };
        if (this.props.quiz.learnfragebogen !== 'random') {
            auswahl = fest[this.props.quiz.learnfragebogen];
            this.props.safeLearnAuswahl(auswahl);
        }    
        if (this.props.quiz.learnfragebogen === 'random') {
            if (this.props.quiz.learnauswahl.length === 0) {
                const basis = [];
                while (basis.length < 7) {
                    const r = Math.floor(Math.random() * 72) + 1;
                    if (basis.indexOf(r) === -1) basis.push(r);
                }
                console.log(basis);
                const binnen = [];
                while (binnen.length < 21) {
                    const r = Math.floor(Math.random() * 181) + 73;
                    if (binnen.indexOf(r) === -1) binnen.push(r);
                }
                console.log(binnen);
                const segeln = [];
                while (segeln.length < 2) {
                    const r = Math.floor(Math.random() * 47) + 254;
                    if (segeln.indexOf(r) === -1) segeln.push(r);
                }
                auswahl = [...basis, ...binnen, ...segeln];
                this.props.safeLearnAuswahl(auswahl);
            }
        }
        /**
         * Random oder feste ID-Vorgaben
         * Aus diesen Ids dann neues Array herausfiltern aus Fragenpool
         * In dem Array dann alle relevanten Daten vorhanden
         */
        this.arrnew = jsondata.filter(val => {
            return auswahl.includes(val.id);
        });
    }
    /**
     * Drücken des Buttons-Zurück
     */
    prev() {
        if (this.props.quiz.learnqno >= 1) {
            if (this.props.quiz.learnarr[this.props.quiz.learnqno] === undefined) {
                this.props.selectLearnAnswer('-1');
            }
            this.props.decrementLearn();
            this.setState({
                lighted: false
            });
        }
    }
    /**
     * Drücken des Buttons-Weiter
     */
    next() {
            if (this.props.quiz.learnqno < this.arrnew.length - 1) {
                if (this.props.quiz.learnarr[this.props.quiz.learnqno] === undefined) {
                    this.props.selectLearnAnswer('-1');
                }
                this.props.incrementLearn();
                this.setState({
                    lighted: false
                });
                this.setState({
                    lighted: false
                });
            } else {
                // wenn das Ende des Arrays erreicht ist
                
                
                /** 
                aktuell nicht implementiert, hier könnte man sich jedoch den Score für Learnfragen anzeigen lassen
                und zu der neuen LearnResult.js (müsste angepasst werden)
                
                
                for (let i = 0, l = this.arrnew.length; i < l; i++) {
                    console.log(i);
                    if (this.props.quiz.learnarr[i] === this.arrnew[i].correctAnswer) {
                        if (this.arrnew[i].category === 'Basis') {
                            this.basisScore++;
                            console.log('BasisFrage richtig');
                        }
                        if (this.arrnew[i].category === 'Binnen') {
                            this.spezScore++;
                            console.log('BinnenFrage richtig');
                        }
                        if (this.arrnew[i].category === 'Segeln') {
                            this.spezScore++;
                            console.log('SegelnFrage richtig');
                        }
                    }
                if (this.props.quiz.learnarr[i] !== this.arrnew[i].correctAnswer) { 
                        this.props.wrongLearn(i);
                }
            }
            this.props.getLearnBasisScore(this.basisScore);
            this.props.getLearnSpezScore(this.spezScore);
            actions.toResult();
            */
           actions.toLearnStart();
        }
    }
    /**
     * Auswahl einer Antwort mit Radiobutton -> Speicherung in Redux-State
     * @param ans 
     */
    answer(ans) {
        if (this.props.quiz.learnarr[this.props.quiz.learnqno] === undefined) {
            this.props.selectLearnAnswer(ans);
        }
        if (this.props.quiz.learnarr[this.props.quiz.learnqno] !== ans) {
            this.props.updateLearnAnswer(ans, this.props.quiz.learnqno);
            }
    }
    /**
     * markieren einer Frage, aktuell hier nicht geused, aber states sind bereits angepasst
     */
    markQuestion() {
        if (this.props.quiz.learnmarked.includes(this.props.quiz.learnqno) === true) {
            this.props.unmarkLearn(this.props.quiz.learnqno);
            showMessage({
                message: 'Hinweis',
                description: 'Frage nicht mehr markiert',
                type: 'success',
                icon: 'success'
            });
        } else {
            this.props.markLearn(this.props.quiz.learnqno);
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

    renderHighlightButton() {
        const { markButtonStyle, markButtonImageStyle } = questionButtonStyle;

        if (canHighlight) {
            if (this.state.lighted) {
                return (
                    <ImageButton
                        onPress={() => this.undoHighlight()}
                        img={img.highlighted}
                        buttonStyle={markButtonStyle} 
                        imageStyle={markButtonImageStyle}
                    />
                );            
            }
            return (
                <ImageButton
                    onPress={() => this.doHighlight()}
                    img={img.highlight}
                    buttonStyle={markButtonStyle} 
                    imageStyle={markButtonImageStyle}
                />  
            );
        }         
    }

    renderMarkButton() {
        
        /* aktuell nicht genutzt, um zu nutzen einfach entkommentieren, States bereits in Redux angepasst ;)
        
        const { markButtonStyle, markButtonImageStyle } = questionButtonStyle;
        if (this.props.quiz.learnmarked.includes(this.props.quiz.learnqno)) {
            return (
                <ImageButton
                    onPress={() => this.markQuestion()}                    
                    img={img.marked}
                    buttonStyle={markButtonStyle} 
                    imageStyle={markButtonImageStyle}
                />
            );            
        } 
        return (
            <ImageButton
                onPress={() => this.markQuestion()} 
                img={img.mark}
                buttonStyle={markButtonStyle} 
                imageStyle={markButtonImageStyle}
            />  
        ); 
        */         
    }

    renderRadioButtons(radioProps, init, key) {
        if (Platform.OS === 'ios') {
            radioButtonStyle.labelBackground = { backgroundColor: 'white' };
        }

        return (
            <RadioForm
                style={radioButtonStyle.radioFormStyle}
                key={key}
                radio_props={radioProps}
                initial={init}
                onPress={(value) => { this.answer(value); }}
                labelStyle={[radioButtonStyle.labelStyle, radioButtonStyle.labelBackground]}
                
                buttonSize={3}
                buttonBorderWidth={0}
                buttonOuterSize={-1}                                   
                buttonStyle={{ zIndex: -2 }}

                buttonColor={radioButtonStyle.buttonColor.color}                 
                selectedButtonColor={radioButtonStyle.selectedButtonColor.color}

                labelColor={radioButtonStyle.labelColor.color}
                selectedLabelColor={radioButtonStyle.selectedLabelColor.color}
            />  
        );      
    }

    renderDebug() {
        if (debug === true) {
            return (
                <View style={{ flexDirection: 'column' }}>
                <Text>
                    Kategorie: {this.arrnew[this.props.quiz.learnqno].category}
                </Text>
                <Text>
                    Korrekteantwort: {this.arrnew[this.props.quiz.learnqno].correctAnswer}
                </Text>
                <Text>
                    {console.log(this.props)}
                    Fragebogen: {this.props.quiz.learnfragebogen}
                </Text>
                <Text>
                    Qno: {this.props.quiz.learnqno}
                </Text>
            </View>
            );
        }
    }

    renderContent() {
        let highlight = ['abc'];
        switch (this.arrnew[this.props.quiz.learnqno].highlightWords[0]) {
            case 'option1':
                highlight[0] = this.arrnew[this.props.quiz.learnqno].options.option1;
                break;
            case 'option2':
                highlight[0] = this.arrnew[this.props.quiz.learnqno].options.option2;
                break;
            case 'option3':
                highlight[0] = this.arrnew[this.props.quiz.learnqno].options.option3;
                break;
            case 'option4':
                highlight[0] = this.arrnew[this.props.quiz.learnqno].options.option4;
                break;
            default:
                highlight = this.arrnew[this.props.quiz.learnqno].highlightWords;
            } 

        /**
         * RadioButtons mit Fragentexten
         */    
        const radioProps = [ 
            { label: (this.state.lighted === true &&
                this.arrnew[this.props.quiz.learnqno].options.option1.includes(highlight) ? 
                <Highlighter
                    highlightStyle={highlighter.lighted}
                    searchWords={[highlight.toString()]}
                    textToHighlight={this.arrnew[this.props.quiz.learnqno].options.option1}
                /> : this.arrnew[this.props.quiz.learnqno].options.option1),
                value: 'option1' },
            { label: (this.state.lighted === true &&
                this.arrnew[this.props.quiz.learnqno].options.option2.includes(highlight) ?  
                <Highlighter
                    highlightStyle={highlighter.lighted}
                    searchWords={[highlight.toString()]}
                    textToHighlight={this.arrnew[this.props.quiz.learnqno].options.option2}
                /> : this.arrnew[this.props.quiz.learnqno].options.option2),
                value: 'option2' },
            { label: (this.state.lighted === true &&
                this.arrnew[this.props.quiz.learnqno].options.option3.includes(highlight) ?  
                <Highlighter
                    highlightStyle={highlighter.lighted}
                    searchWords={[highlight.toString()]}
                    textToHighlight={this.arrnew[this.props.quiz.learnqno].options.option3}
                /> : this.arrnew[this.props.quiz.learnqno].options.option3),
                 value: 'option3' },
            { label: (this.state.lighted === true &&
                this.arrnew[this.props.quiz.learnqno].options.option4.includes(highlight) ?  
                <Highlighter
                    highlightStyle={highlighter.lighted}
                    searchWords={[highlight.toString()]}
                    textToHighlight={this.arrnew[this.props.quiz.learnqno].options.option4}
                /> : this.arrnew[this.props.quiz.learnqno].options.option4),
                    value: 'option4' },
        ];

        let init = null;
        switch (this.props.quiz.learnarr[this.props.quiz.learnqno]) {
            case 'option1':
                init = 0;
            break;
            case 'option2':
                init = 1;
            break;
            case 'option3':
                init = 2;
            break;
            case 'option4':
                init = 3;
            break;
            default:
                init = -1;
        }

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
                            id={this.arrnew[this.props.quiz.learnqno].id} 
                            text={this.arrnew[this.props.quiz.learnqno].frageText} 
                            image={this.arrnew[this.props.quiz.learnqno].image}
                            progress={[this.props.quiz.learnqno + 1, ' / 30']}
                        />                
                    
                        <CardSection style={{ backgroundColor: 'transparent' }}>                  
                            {this.renderRadioButtons(radioProps, init, this.props.quiz.learnqno)}
                        </CardSection>  
                    </Card>
                </ScrollView>    

                <Card cardStyle={questionCardStyle.navCardStyle}>
                    <ButtonWithImage
                        onPress={() => this.prev()}
                        buttonText="Zurück"
                        disabled={this.props.quiz.learnqno === 0}
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
                        buttonText={this.props.quiz.learnqno === 29 ? 'Zum Start' : 'Nächste'}
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
    return { quiz: state.learn };
};

export default connect(mapStateToProbs, actions)(LearnQuestionPage);

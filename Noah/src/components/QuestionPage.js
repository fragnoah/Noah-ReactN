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

class QuestionPage extends Component {
    constructor(props) {
        super(props);
        this.basisScore = 0;
        this.spezScore = 0;
        let auswahl = [];
        this.state = {
            lighted: false,
        };
        /** etwas unschön - besser aus JSON, aber nice to Have */ 
        if (this.props.quiz.fragebogen === 'fb1') { 
            auswahl = [8, 16, 17, 32, 47, 60, 63, 79, 88, 92, 106, 124, 132, 140, 147,
                150, 158, 159, 171, 176, 182, 194, 202, 209, 216, 224, 235, 253, 265, 271];
            this.props.safeAuswahl(auswahl);
            }
        if (this.props.quiz.fragebogen === 'fb2') { 
            auswahl = [7, 15, 27, 39, 48, 67, 71, 78, 89, 93, 100, 118, 122, 134, 139,
                152, 157, 166, 167, 177, 181, 187, 197, 207, 214, 218, 232, 243, 252, 279];
            this.props.safeAuswahl(auswahl);
            }

        //    
        if (this.props.quiz.fragebogen === 'random') {
            if (this.props.quiz.auswahl.length === 0) {
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
                console.log(segeln);
                auswahl = [...basis, ...binnen, ...segeln];
                console.log(auswahl);
                this.props.safeAuswahl(auswahl);
            } else {
                auswahl = this.props.quiz.auswahl;
            }
        }
        this.arrnew = jsondata.filter(val => {
            return auswahl.includes(val.id);
        });
    }

    prev() {
        if (this.props.quiz.qno >= 1) {
            if (this.props.quiz.arr[this.props.quiz.qno] === undefined) {
                this.props.selectAnswer('-1');
            }
            this.props.decrement();
            this.setState({
                lighted: false
            });
        }
    }

    next() {
            if (this.props.quiz.qno < this.arrnew.length - 1) {
                if (this.props.quiz.arr[this.props.quiz.qno] === undefined) {
                    this.props.selectAnswer('-1');
                }
                this.props.increment();
                this.setState({
                    lighted: false
                });
                this.setState({
                    lighted: false
                });
            } else {
                for (let i = 0, l = this.arrnew.length; i < l; i++) {
                    console.log(i);
                    if (this.props.quiz.arr[i] === this.arrnew[i].correctAnswer) {
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
                if (this.props.quiz.arr[i] !== this.arrnew[i].correctAnswer) { 
                        this.props.wrong(i);
                }
            }
            this.props.getBasisScore(this.basisScore);
            this.props.getSpezScore(this.spezScore);
            actions.toResult();
        }
    }

    answer(ans) {
        if (this.props.quiz.arr[this.props.quiz.qno] === undefined) {
            this.props.selectAnswer(ans);
        }
        if (this.props.quiz.arr[this.props.quiz.qno] !== ans) {
            this.props.updateAnswer(ans, this.props.quiz.qno);
            }
    }

    markQuestion() {
        if (this.props.quiz.marked.includes(this.props.quiz.qno) === true) {
            this.props.unmark(this.props.quiz.qno);
            showMessage({
                message: 'Hinweis',
                description: 'Frage nicht mehr makiert',
                type: 'success',
                icon: 'success'
            });
        } else {
            this.props.mark(this.props.quiz.qno);
            showMessage({
                message: 'Hinweis',
                description: 'Frage wurde makiert',
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
        const { markButtonStyle, markButtonImageStyle } = questionButtonStyle;
        if (this.props.quiz.marked.includes(this.props.quiz.qno)) {
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
                    Kategorie: {this.arrnew[this.props.quiz.qno].category}
                </Text>
                <Text>
                    Korrekteantwort: {this.arrnew[this.props.quiz.qno].correctAnswer}
                </Text>
                <Text>
                    {console.log(this.props)}
                    Fragebogen: {this.props.quiz.fragebogen}
                </Text>
                <Text>
                    Qno: {this.props.quiz.qno}
                </Text>
            </View>
            );
        }
    }

    renderContent() {
        let highlight = ['abc'];
        switch (this.arrnew[this.props.quiz.qno].highlightWords[0]) {
            case 'option1':
                highlight[0] = this.arrnew[this.props.quiz.qno].options.option1;
                break;
            case 'option2':
                highlight[0] = this.arrnew[this.props.quiz.qno].options.option2;
                break;
            case 'option3':
                highlight[0] = this.arrnew[this.props.quiz.qno].options.option3;
                break;
            case 'option4':
                highlight[0] = this.arrnew[this.props.quiz.qno].options.option4;
                break;
            default:
                highlight = this.arrnew[this.props.quiz.qno].highlightWords;
            } 

            
        const radioProps = [ 
            { label: (this.state.lighted === true &&
                this.arrnew[this.props.quiz.qno].options.option1.includes(highlight) ? 
                <Highlighter
                    highlightStyle={highlighter.lighted}
                    searchWords={[highlight.toString()]}
                    textToHighlight={this.arrnew[this.props.quiz.qno].options.option1}
                /> : this.arrnew[this.props.quiz.qno].options.option1),
                value: 'option1' },
            { label: (this.state.lighted === true &&
                this.arrnew[this.props.quiz.qno].options.option2.includes(highlight) ?  
                <Highlighter
                    highlightStyle={highlighter.lighted}
                    searchWords={[highlight.toString()]}
                    textToHighlight={this.arrnew[this.props.quiz.qno].options.option2}
                /> : this.arrnew[this.props.quiz.qno].options.option2),
                value: 'option2' },
            { label: (this.state.lighted === true &&
                this.arrnew[this.props.quiz.qno].options.option3.includes(highlight) ?  
                <Highlighter
                    highlightStyle={highlighter.lighted}
                    searchWords={[highlight.toString()]}
                    textToHighlight={this.arrnew[this.props.quiz.qno].options.option3}
                /> : this.arrnew[this.props.quiz.qno].options.option3),
                 value: 'option3' },
            { label: (this.state.lighted === true &&
                this.arrnew[this.props.quiz.qno].options.option4.includes(highlight) ?  
                <Highlighter
                    highlightStyle={highlighter.lighted}
                    searchWords={[highlight.toString()]}
                    textToHighlight={this.arrnew[this.props.quiz.qno].options.option4}
                /> : this.arrnew[this.props.quiz.qno].options.option4),
                    value: 'option4' },
        ];

        let init = null;
        switch (this.props.quiz.arr[this.props.quiz.qno]) {
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
                            id={this.arrnew[this.props.quiz.qno].id} 
                            text={this.arrnew[this.props.quiz.qno].frageText} 
                            image={this.arrnew[this.props.quiz.qno].image}
                            progress={[this.props.quiz.qno + 1, ' / 30']}
                        />                
                    
                        <CardSection style={{ backgroundColor: 'transparent' }}>                  
                            {this.renderRadioButtons(radioProps, init, this.props.quiz.qno)}
                        </CardSection>  
                    </Card>
                </ScrollView>    

                <Card cardStyle={questionCardStyle.navCardStyle}>
                    <ButtonWithImage
                        onPress={() => this.prev()}
                        buttonText="Zurück"
                        disabled={this.props.quiz.qno === 0}
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
                        buttonText={this.props.quiz.qno === 29 ? 'Ergebnis' : 'Nächste'}
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

export default connect(mapStateToProbs, actions)(QuestionPage);

import React, { Component } from 'react';
import { 
    View,
    Text,
    ScrollView,
    Platform,
    ImageBackground
    } from 'react-native';

import { connect } from 'react-redux';
import RadioForm from 'react-native-simple-radio-button';
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

class RepeatPage extends Component {
    constructor(props) {
        super(props);
        this.arrnew = jsondata.filter(val => {
            return this.props.quiz.auswahl.includes(val.id);
        });
        this.state = {
            qno: 0,
        };
        this.antworten = this.props.quiz.wrongAns;
    }

    prev() {
        console.log('vorherige');
        if (this.state.qno >= 1) {
            if (this.props.quiz.wrongArr[this.state.qno] === undefined) {
                this.props.selectWrongAnswer('-1');       
            }
            this.setState({
                qno: this.state.qno - 1
            });
        }
    }

    next() {
        console.log('nächste');
        if (this.state.qno < this.props.quiz.wrongAns.length - 1) {
            if (this.props.quiz.wrongArr[this.state.qno] === undefined) {
                this.props.selectWrongAnswer('-1');       
            }
            this.setState({
                qno: this.state.qno + 1
            });
            } else {
                console.log('ende?');
                this.props.resetWrong();
                console.log('vor loop schleife');
                for (let i = 0, l = this.props.quiz.wrongArr.length; i < l; i++) {
                    if (this.props.quiz.wrongArr[i] !== 
                        this.arrnew[this.antworten[i]].correctAnswer) { 
                            this.props.wrong(this.antworten[i]);
                    }
                }
                console.log('nach loop schleife');
                this.props.resetWrongAnswer();
                console.log('nach reset');
                actions.toResult();
            }
    }

    answer(ans) {
        if (this.props.quiz.wrongArr[this.state.qno] === undefined) {
            this.props.selectWrongAnswer(ans);
        } 
        if (this.props.quiz.wrongArr[this.state.qno] !== ans) {
            this.props.updateWrongAnswer(ans, this.state.qno); 
        }
    }

    markQuestion() {
        if (this.props.quiz.marked.includes(
                this.props.quiz.wrongAns[this.state.qno]) === true) {
            this.props.unmark(this.props.quiz.wrongAns[this.state.qno]);
            showMessage({
                message: 'Hinweis',
                description: 'Frage nicht mehr makiert',
                type: 'success',
                icon: 'success'
            });
        } else {
            this.props.mark(this.props.quiz.wrongAns[this.state.qno]);
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
                    disabled={this.arrnew[this.props.quiz.qno].highlightWords.length === 0}
                />  
            );
        }         
    }

    renderMarkButton() {
        const { markButtonStyle, markButtonImageStyle } = questionButtonStyle;
        if (this.props.quiz.marked.includes(this.props.quiz.wrongAns[this.state.qno])) {
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

    renderContent() {
        /*
        const radioProps = [
            { label: this.arrnew[this.antworten[this.state.qno]].options.option1,
                value: 'option1' },
            { label: this.arrnew[this.antworten[this.state.qno]].options.option2,
                value: 'option2' },
            { label: this.arrnew[this.antworten[this.state.qno]].options.option3,
                value: 'option3' },
            { label: this.arrnew[this.antworten[this.state.qno]].options.option4,
                value: 'option4' },
        ];
        */
       const radioProps = [ 
        { label: (this.state.lighted === true ? 
            <Highlighter
                highlightStyle={highlighter.lighted}
                searchWords={[this.arrnew[this.antworten[this.state.qno]].highlightWords]}
                textToHighlight={this.arrnew[this.antworten[this.state.qno]].options.option1}
            /> : this.arrnew[this.antworten[this.state.qno]].options.option1),
            value: 'option1' },
        { label: (this.state.lighted === true ? 
            <Highlighter
                highlightStyle={highlighter.lighted}
                searchWords={[this.arrnew[this.antworten[this.state.qno]].highlightWords]}
                textToHighlight={this.arrnew[this.antworten[this.state.qno]].options.option2}
            /> : this.arrnew[this.antworten[this.state.qno]].options.option2),
            value: 'option2' },
        { label: (this.state.lighted === true ? 
            <Highlighter
                highlightStyle={highlighter.lighted}
                searchWords={[this.arrnew[this.antworten[this.state.qno]].highlightWords]}
                textToHighlight={this.arrnew[this.antworten[this.state.qno]].options.option3}
            /> : this.arrnew[this.antworten[this.state.qno]].options.option3),
             value: 'option3' },
        { label: (this.state.lighted === true ? 
            <Highlighter
                highlightStyle={highlighter.lighted}
                searchWords={[this.arrnew[this.antworten[this.state.qno]].highlightWords]}
                textToHighlight={this.arrnew[this.antworten[this.state.qno]].options.option4}
            /> : this.arrnew[this.antworten[this.state.qno]].options.option4),
                value: 'option4' },
    ];
        
        let init = null;
        switch (this.props.quiz.wrongArr[this.state.qno]) {
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
                            style={{ backgroundColor: '#8CD6FC' }} 
                            id={this.arrnew[this.antworten[this.state.qno]].id} 
                            text={this.arrnew[this.antworten[this.state.qno]].frageText} 
                            image={this.arrnew[this.antworten[this.state.qno]].image}
                            progress={[this.state.qno + 1, ' /',
                                this.antworten.length]}
                        />                
                    
                        <CardSection style={{ backgroundColor: 'transparent' }}> 
                                            
                            {this.renderRadioButtons(radioProps, init, this.state.qno)}       
                        </CardSection>  
                    </Card>
                </ScrollView>    

                <Card cardStyle={questionCardStyle.navCardStyle}>
                    <ButtonWithImage
                        onPress={() => this.prev()}
                        buttonText="Zurück"
                        disabled={this.state.qno === 0}
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
                        buttonText={
                            this.state.qno === this.antworten.length - 1 ? 
                            'Ergebnis' : 'Nächste'}
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
                /> 
            </View>
             
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

export default connect(mapStateToProbs, actions)(RepeatPage);

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
import FlashMessage, { showMessage } from 'react-native-flash-message';
import jsondata from '../assets/datasrc/FB1_2.json';
import { Card, CardSection, ImageCardSection, ButtonWithImage, ImageButton } from './common';
import * as actions from '../actions';
import { 
    radioButtonStyle, 
    questionButtonStyle, 
    questionCardStyle, 
    userMessage 
} from './styleSheets';
import { iosFix, debug } from '../utils';

class RepeatAll extends Component {
    constructor(props) {
        super(props);
        const jdata = jsondata[this.props.quiz.fragebogen];
        this.arrnew = Object.keys(jdata).map(k => jdata[k]);
        this.state = {
            qno: 0,
        };
    }
    prev() {
        console.log('vorherige');
        if (this.state.qno >= 1) {
            if (this.props.quiz.arr[this.state.qno] === undefined) {
                this.props.selectAnswer('-1');       
            }
            this.setState({
                qno: this.state.qno - 1
            });
        }
    }
    next() {
        console.log('nächste');
        if (this.state.qno < this.arrnew.length - 1) {
            if (this.props.quiz.arr[this.state.qno] === undefined) {
                this.props.selectAnswer('-1');       
            }
            this.setState({
                qno: this.state.qno + 1
            });
            } else {
                actions.toResult();
            }
        }
    answer(ans) {
        if (this.props.quiz.arr[this.state.qno] === undefined) {
            this.props.selectAnswer(ans);
        } 
        if (this.props.quiz.arr[this.state.qno] !== ans) {
            this.props.updateAnswer(ans, this.state.qno); 
        }
    }
    markQuestion() {
        if (this.props.quiz.marked.includes(this.state.qno) === true) {
            this.props.unmark(this.state.qno);
            showMessage({
                message: 'Hinweis',
                description: 'Frage nicht mehr makiert',
                type: 'success',
                icon: 'success'
            });
        } else {
            this.props.mark(this.state.qno);
            showMessage({
                message: 'Hinweis',
                description: 'Frage wurde makiert',
                type: 'success',
                icon: 'success'
            });
        }
    }

    renderMarkButton() {
        const { markButtonStyle, markButtonImageStyle } = questionButtonStyle;
        if (this.props.quiz.marked.includes(this.state.qno)) {
            return (
                <ImageButton
                    onPress={() => this.markQuestion()}
                    img={require('../assets/img/flaged.png')}
                    buttonStyle={markButtonStyle} 
                    imageStyle={markButtonImageStyle}
                />
            );            
        } 
        return (
            <ImageButton
                onPress={() => this.markQuestion()}
                img={require('../assets/img/flag.png')}
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
        const radioProps = [
            { label: this.arrnew[this.state.qno].options.option1,
                value: 'option1' },
            { label: this.arrnew[this.state.qno].options.option2,
                value: 'option2' },
            { label: this.arrnew[this.state.qno].options.option3,
                value: 'option3' },
            { label: this.arrnew[this.state.qno].options.option4,
                value: 'option4' },
        ];
        
        let init = null;
        switch (this.props.quiz.arr[this.state.qno]) {
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
                            id={this.arrnew[this.state.qno].id} 
                            text={this.arrnew[this.state.qno].frageText} 
                            image={this.arrnew[this.state.qno].image}
                            progress={[this.state.qno + 1, ' /',
                                this.arrnew.length]}
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

                    <ButtonWithImage
                        onPress={() => this.next()}
                        buttonText={
                            this.state.qno === this.arrnew.length - 1 ? 'Ergebnis' : 'Nächste'}
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
                    position="bottom" 
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


export default connect(mapStateToProbs, actions)(RepeatAll);


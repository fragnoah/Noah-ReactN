import React, { Component } from 'react';
import { 
    View,
    Text,
    ScrollView,
    StyleSheet,
    //Button
    } from 'react-native';

import { connect } from 'react-redux';
import RadioForm from 'react-native-simple-radio-button';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import jsondata from '../assets/datasrc/Fragenpool.json';
import { Card, CardSection, ImageCardSection, ButtonWithImage, ImageButton } from './common';
import * as actions from '../actions';

class RepeatAll extends Component {
    constructor(props) {
        super(props);
        this.arrnew = jsondata.filter(val => {
            return this.props.quiz.auswahl.includes(val.id);
        });
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
        if (this.props.quiz.marked.includes(this.state.qno)) {
            return (
                <ImageButton
                    onPress={() => this.markQuestion()}
                    img={require('../assets/img/flaged.png')}
                    buttonStyle={styles.markButtonStyle} 
                    imageStyle={styles.markButtonImageStyle}
                />
            );            
        } 
        return (
            <ImageButton
                onPress={() => this.markQuestion()}
                img={require('../assets/img/flag.png')}
                buttonStyle={styles.markButtonStyle} 
                imageStyle={styles.markButtonImageStyle}
            />  
        );         
    }

     render() {
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
                    <Card cardStyle={styles.cardStyle}>
                        <ImageCardSection 
                            style={{ backgroundColor: '#8CD6FC' }} 
                            id={this.arrnew[this.state.qno].id} 
                            text={this.arrnew[this.state.qno].frageText} 
                            image={this.arrnew[this.state.qno].image}
                            progress={[this.state.qno + 1, ' /',
                                this.arrnew.length]}
                        />                
                    
                        <CardSection>                  
                            <RadioForm
                                key={this.state.qno}
                                radio_props={radioProps}
                                initial={init}
                                onPress={(value) => { this.answer(value); }}
                            />        
                        </CardSection>  
                    </Card>
                </ScrollView>    

                <View style={{ flexDirection: 'row', flex: 0, justifyContent: 'space-between' }}>
                    <ButtonWithImage
                        onPress={() => this.prev()}
                        buttonText="Zurück"
                        disabled={this.state.qno === 0}
                        imgLeft={require('../assets/img/arrowLeft.png')}
                        imageStyle={styles.navButtonImageStyle}
                        buttonStyle={styles.navButtonStyle}
                        textStyle={styles.navTextStyle}
                        removeEmptyImage
                    />

                      {this.renderMarkButton()}

                    <ButtonWithImage
                        onPress={() => this.next()}
                        buttonText={this.state.qno === this.arrnew.length - 1 ? 'Ergebnis' : 'Nächste'}
                        imgRight={require('../assets/img/arrowRight.png')}
                        imageStyle={styles.navButtonImageStyle}
                        buttonStyle={styles.navButtonStyle}
                        textStyle={styles.navTextStyle2}
                        removeEmptyImage
                    />
                </View>

                <View style={{ flexDirection: 'column' }}>
                    <Text>
                        Kategorie: {this.arrnew[this.state.qno].category}
                    </Text>
                    <Text>
                        Korrekteantwort: {this.arrnew[this.state.qno].correctAnswer}
                    </Text>
                    <Text>
                        {console.log(this.props)}
                        Fragebogen: {this.props.quiz.fragebogen}
                    </Text>
                    <Text>
                        Qno: {this.state.qno}
                    </Text>
                </View>
                <FlashMessage 
                    style={styles.flashMessage} 
                    ref="myLocalFlashMessage" 
                    position="bottom" 
                /> 

            </View>
             
        );
    }
}
const styles = StyleSheet.create({
 
    flashMessage: {
        zIndex: 7
    },
    navButtonImageStyle: {
        
        height: 20,
        width: 20,
    },
    markButtonStyle: {
        //height: 50,
        width: 50,
        flex: 1,
        resizeMode: 'cover',
        flexDirection: 'column',
        justifyContent: 'center',
        //justifyContent: 'space-around',
        //flex: 0,
        alignSelf: 'center',
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 0,
        elevation: 1,
        paddingTop: 5,
        paddingBottom: 5,
    },
    markButtonImageStyle: {
        alignSelf: 'center',
        height: 30,
        flex: 1,
        paddingTop: 5,
        paddingBottom: 5,
    },
    navButtonStyle: {
        flex: 1,
        width: 100,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 0,
    },
    navBar: {
        flexDirection: 'row', 
        flex: 0
    },
    navTextStyle: {
        justifyContent: 'flex-start',
        color: '#007aff',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: '600',
      },
      navTextStyle2: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        color: '#007aff',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: '600',
      },
    cardStyle: {
        backgroundColor: 'rgba(255,255,255, 0.3)',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
        flex: 1
    },
  });

const mapStateToProbs = state => {
    return { quiz: state.selectedFb };
};


export default connect(mapStateToProbs, actions)(RepeatAll);


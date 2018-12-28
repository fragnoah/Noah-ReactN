import React, { Component } from 'react';
import { 
    View,
    Text,
    ScrollView,
    StyleSheet,
    Button
    } from 'react-native';

import { connect } from 'react-redux';
import RadioForm from 'react-native-simple-radio-button';
import jsondata from '../assets/datasrc/FB1_2.json';
import { Card, CardSection, ImageCardSection } from './common';
import * as actions from '../actions';

class RepeatPage extends Component {
    constructor(props) {
        super(props);
        const jdata = jsondata[this.props.quiz.fragebogen];
        this.arrnew = Object.keys(jdata).map(k => jdata[k]);
        this.state = {
            qno: 0
        };
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
                const antworten = this.props.quiz.wrongAns;
                this.props.resetWrong();
                console.log('vor loop schleife');
                for (let i = 0, l = this.props.quiz.wrongArr.length; i < l; i++) {
                    if (this.props.quiz.wrongArr[i] !== 
                        this.arrnew[antworten[i]].correctAnswer) { 
                            this.props.wrong(antworten[i]);
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
        if (this.props.quiz.wrongArr[this.props.quiz.qno] !== ans) {
            this.props.updateWrongAnswer(ans, this.state.qno); 
        }
    }
     render() {
        const radioProps = [
            { label: this.arrnew[this.props.quiz.wrongAns[this.state.qno]].options.option1,
                value: 'option1' },
            { label: this.arrnew[this.props.quiz.wrongAns[this.state.qno]].options.option2,
                value: 'option2' },
            { label: this.arrnew[this.props.quiz.wrongAns[this.state.qno]].options.option3,
                value: 'option3' },
            { label: this.arrnew[this.props.quiz.wrongAns[this.state.qno]].options.option4,
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
        return (
            <ScrollView
            style={{ 
                backgroundColor: '#F5FCFF',
                paddingTop: 5,
                marginLeft: 2,
                marginRight: 2 
            }}
            >
                <Card>
                
                <ImageCardSection 
                    style={{ backgroundColor: '#8CD6FC' }} 
                    id={this.arrnew[this.props.quiz.wrongAns[this.state.qno]].id} 
                    text={this.arrnew[this.props.quiz.wrongAns[this.state.qno]].frageText} 
                    image={this.arrnew[this.props.quiz.wrongAns[this.state.qno]].image}
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
                <View style={{ flexDirection: 'row', flex: 1 }}>
                <Button
                    onPress={() => this.prev()}
                    title="Zurück"
                    color="#0000ff"
                    disabled={this.state.qno === 0}
                />

                <View style={{ margin: 15 }} />                 
                <Button
                    onPress={() => this.next()}
                    title={this.state.qno === this.props.quiz.wrongAns.length - 1 ?
                        'Ergebnis' : 'Nächste'}
                    color={this.state.qno !== this.props.quiz.wrongAns.length - 1 ? 
                        '#0000ff' : '#008000'}
                />
                </View>

                <View style={{ flexDirection: 'column' }}>
                    <Text>
                    Kategorie: { this.arrnew[this.props.quiz.wrongAns[this.state.qno]].category}
                    </Text>
                    <Text>
                    Korrekteantwort: {this.arrnew[this.props.quiz.wrongAns[this.state.qno]].correctAnswer}
                    </Text>
                    <Text>
                     {console.log(this.props)}
                     Fragebogen: {this.props.quiz.fragebogen}
                    </Text>
                    <Text>
                        Qno: {this.state.qno}
                    </Text>
                </View>
            
        </ScrollView> 
        );
    }
}
const styles = StyleSheet.create({
 
    oval: {
    width: 350,
    borderRadius: 20,
    backgroundColor: 'green'
    },
    container: {
      flex: 1,
      alignItems: 'center'
    },
    welcome: {
      fontSize: 20,
      margin: 15,
      color: 'white'
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });

const mapStateToProbs = state => {
    return { quiz: state.selectedFb };
};

export default connect(mapStateToProbs, actions)(RepeatPage);

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
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { toLearnSegelQuestions } from '../actions';

class QuestionPage extends Component {
    constructor(props) {
        super(props);
        this.basisScore = 0;
        this.spezScore = 0;
        const jdata = jsondata[this.props.quiz.fragebogen];
        this.arrnew = Object.keys(jdata).map(k => jdata[k]);   
    }
    prev() {
        if (this.props.quiz.qno >= 1) {
            if (this.props.quiz.arr[this.props.quiz.qno] === undefined) {
                this.props.selectAnswer('-1');
            }
            this.props.decrement();
        }
    }
    next() {
            if (this.props.quiz.qno < this.arrnew.length - 1) {
                if (this.props.quiz.arr[this.props.quiz.qno] === undefined) {
                    this.props.selectAnswer('-1');
                }
                this.props.increment();
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
     render() {
        const radioProps = [
            { label: this.arrnew[this.props.quiz.qno].options.option1, value: 'option1' },
            { label: this.arrnew[this.props.quiz.qno].options.option2, value: 'option2' },
            { label: this.arrnew[this.props.quiz.qno].options.option3, value: 'option3' },
            { label: this.arrnew[this.props.quiz.qno].options.option4, value: 'option4' },
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
                    id={this.arrnew[this.props.quiz.qno].id} 
                    text={this.arrnew[this.props.quiz.qno].frageText} 
                    image={this.arrnew[this.props.quiz.qno].image}
                />
                
                <CardSection>                  
                    <RadioForm
                        key={this.props.quiz.qno}
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
                    disabled={this.props.quiz.qno === 0}
                    />

                <View style={{ margin: 15 }} />                 
                    <Button
                    onPress={() => this.next()}
                    title={this.props.quiz.qno === 29 ? 'Ergebnis' : 'Nächste'}
                    color={this.props.quiz.qno !== 29 ? '#0000ff' : '#008000'}
                    />
                </View>

                <View style={{ flexDirection: 'column' }}>
                    <Button
                    onPress={() => this.markQuestion()}
                    title="Frage makieren"
                    color="#841584"
                    />
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
            <FlashMessage 
                style={styles.flashMessage} 
                ref="myLocalFlashMessage" 
                position="bottom" 
            />       
        </ScrollView> 
        );
    }
}
const styles = StyleSheet.create({
 
    flashMessage: {
        zIndex: 7
    }
  });

const mapStateToProbs = state => {
    return { quiz: state.selectedFb };
};

export default connect(mapStateToProbs, actions)(QuestionPage);

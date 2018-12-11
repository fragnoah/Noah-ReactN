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
import { Card, CardSection } from './common';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions';

class RepeatPage extends Component {
    constructor(props) {
        super(props);
        this.qno = 0;
        this.props.quiz.wrongAns[this.qno];

        const jdata = jsondata[this.props.quiz.fragebogen];
        this.arrnew = Object.keys(jdata).map(k => jdata[k]);
        this.state = {
            id: this.arrnew[this.props.quiz.wrongAns[this.qno]].id,
            question: this.arrnew[this.props.quiz.wrongAns[this.qno]].frageText,
            options: this.arrnew[this.props.quiz.wrongAns[this.qno]].options,
            correctoption: this.arrnew[this.props.quiz.wrongAns[this.qno]].correctAnswer,
            categories: this.arrnew[this.props.quiz.wrongAns[this.qno]].category,
            selectedAns: -1
        };   
    }
    prev() {
        // wenn hier gno = 0 dann set.Touchableocity leer oder nicht visibale   
        if (this.qno >= 1) {
            this.qno--;       
            this.setState({
                id: this.arrnew[this.props.quiz.wrongAns[this.qno]].id,
                question: this.arrnew[this.props.quiz.wrongAns[this.qno]].frageText,
                options: this.arrnew[this.props.quiz.wrongAns[this.qno]].options,
                correctoption: this.arrnew[this.props.quiz.wrongAns[this.qno]].correctAnswer,
                categories: this.arrnew[this.props.quiz.wrongAns[this.qno]].category,
                selectedAns: -1
            });
        }
    }
    next() {
        if (this.qno < this.props.quiz.wrongAns.length - 1) {
        const antwort = this.state.selectedAns;
        /*
        if (this.props.quiz.arr[this.qno] === undefined) {
            this.props.selectAnswer(antwort);
            console.log('item wurde hinzugefügt');
        } else {
            this.props.updateAnswer(antwort, this.qno); 
            console.log('item wurde geupdated');
        }
        */
         
        
            this.qno++;
            if (this.qno - 1 === this.props.quiz.wrongAns.length) {
                this.setState({
                    id: this.arrnew[this.props.quiz.wrongAns[this.qno]].id, 
                    question: this.arrnew[this.props.quiz.wrongAns[this.qno]].frageText,
                    options: this.arrnew[this.props.quiz.wrongAns[this.qno]].options,
                    correctoption: this.arrnew[this.props.quiz.wrongAns[this.qno]].correctAnswer,
                    categories: this.arrnew[this.props.quiz.wrongAns[this.qno]].category,
                    selectedAns: -1
                    });    
            } else {
            this.setState({
                id: this.arrnew[this.props.quiz.wrongAns[this.qno]].id, 
                question: this.arrnew[this.props.quiz.wrongAns[this.qno]].frageText,
                options: this.arrnew[this.props.quiz.wrongAns[this.qno]].options,
                correctoption: this.arrnew[this.props.quiz.wrongAns[this.qno]].correctAnswer,
                categories: this.arrnew[this.props.quiz.wrongAns[this.qno]].category,
                selectedAns: -1
                });
            }
        } else {
            /*
            for (var i = 0, l = this.arrnew.length; i < l; i++) {
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
                else { 
                    this.props.wrong(i);
                }
            
            this.props.getBasisScore(this.basisScore);
            this.props.getSpezScore(this.spezScore);
            Actions.result();
            */
            Actions.menu();
        }
    }
    answer(ans) {
        this.state.selectedAns = ans;
    } 
     render() {
        const radioProps = [
            { label: this.state.options.option1, value: 'option1' },
            { label: this.state.options.option2, value: 'option2' },
            { label: this.state.options.option3, value: 'option3' },
            { label: this.state.options.option4, value: 'option4' },
        ];
        /*
        let init = null;
        switch (this.props.quiz.arr[this.qno]) {
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
        */
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
                
                <CardSection style={{ backgroundColor: '#002D40' }}>              
                    <Text style={styles.welcome}>
                        {this.state.question}
                    </Text>                
                </CardSection>
                
                <CardSection>                  
                    <RadioForm
                        key={this.qno}
                        radio_props={radioProps}
                        initial={-1}
                        onPress={(value) => { this.answer(value); }}
                    />              
                </CardSection>  
                </Card> 
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Button
                     onPress={() => this.prev()}
                    title="noch verändern(prev)"
                     color="#841584"
                    />

                <View style={{ margin: 15 }} />                 
                    <Button
                     onPress={() => this.next()}
                    title="noch verändern(next)"
                     color="#841584"
                    />
                </View>

                <View style={{ flexDirection: 'column' }}>
                    <Text>
                    Kategorie: {this.state.categories}
                    </Text>
                    <Text>
                    Korrekteantwort: { this.state.correctoption}
                    </Text>
                    <Text>
                     {console.log(this.props)}
                     Fragebogen: {this.props.quiz.fragebogen}
                    </Text>
                    <Text>
                        Qno: {this.qno}
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

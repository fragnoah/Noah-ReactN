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

class QuestionPage extends Component {
    constructor(props) {
        super(props);
        this.qno = 0;
        this.basisScore = 0;
        this.spezScore = 0;

        const jdata = jsondata[this.props.quiz.fragebogen];
        this.arrnew = Object.keys(jdata).map(k => jdata[k]);
        this.state = {
            id: this.arrnew[this.qno].id,
            question: this.arrnew[this.qno].frageText,
            options: this.arrnew[this.qno].options,
            correctoption: this.arrnew[this.qno].correctAnswer,
            categories: this.arrnew[this.qno].category,
            selectedAns: -1,
            image: this.arrnew[this.qno].image,
            marked: this.props.quiz.marked[this.qno]
        };   
    }
    prev() {  
        if (this.qno >= 1) { 
            this.qno--;       
            this.setState({
                id: this.arrnew[this.qno].id,
                question: this.arrnew[this.qno].frageText,
                options: this.arrnew[this.qno].options,
                correctoption: this.arrnew[this.qno].correctAnswer,
                categories: this.arrnew[this.qno].category,
                selectedAns: this.props.quiz.arr[this.qno],
                image: this.arrnew[this.qno].image,
                marked: this.props.quiz.marked[this.qno]
            });
        }
    }
    next() {
            const antwort = this.state.selectedAns;
            if (this.props.quiz.arr[this.qno] === undefined) {
                this.props.selectAnswer(antwort);
                console.log('item wurde hinzugefügt');
            } else {
                this.props.updateAnswer(antwort, this.qno); 
                console.log('item wurde geupdated');
            }
            if (this.qno < this.arrnew.length - 1) {
            this.qno++;
            this.setState({
            id: this.arrnew[this.qno].id, 
                question: this.arrnew[this.qno].frageText,
                options: this.arrnew[this.qno].options,
                correctoption: this.arrnew[this.qno].correctAnswer,
                categories: this.arrnew[this.qno].category,
                selectedAns: this.props.quiz.arr[this.qno],               
                image: this.arrnew[this.qno].image,
                marked: this.props.quiz.marked[this.qno]
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
        this.state.selectedAns = ans;
    }
    markQuestion() {
        if (this.props.quiz.marked.includes(this.qno) === true) {
            console.log('Frage nicht mehr makiert');
            this.props.unmark(this.qno);
        } else {
            this.props.mark(this.qno);
        }
    }
     render() {
        const radioProps = [
            { label: this.state.options.option1, value: 'option1' },
            { label: this.state.options.option2, value: 'option2' },
            { label: this.state.options.option3, value: 'option3' },
            { label: this.state.options.option4, value: 'option4' },
        ];

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
                    id={this.state.id} 
                    text={this.state.question} 
                    image={this.state.image}
                />
                
                <CardSection>                  
                    <RadioForm
                        key={this.qno}
                        radio_props={radioProps}
                        initial={init}
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
                    <Button
                    onPress={() => this.markQuestion()}
                    title="Frage makieren"
                    color="#841584"
                    />
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

export default connect(mapStateToProbs, actions)(QuestionPage);

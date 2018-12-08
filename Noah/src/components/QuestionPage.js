import React, { Component } from 'react';
import { 
    View,
    Text,
    ScrollView,
    StyleSheet,
    Button
    } from 'react-native';

// import { connect } from 'react-redux';
// import actions from '../actions/Quizactions';
import RadioForm from 'react-native-simple-radio-button';
//import jsondata from '../assets/datasrc/test.json';
import jsondata from '../assets/datasrc/FB1_2.json';
//import { QCard, QImgCard } from './common/';
import { Card, CardSection } from './common';
import { connect } from 'react-redux';
import * as actions from '../actions';

class QuestionPage extends Component {
    constructor(props) {
        super(props);
        this.qno = 0;
        this.score = 0;
        
        // hier muss aus redux fb1 bzw fb2 xyz abgerufen
       // const fb=this.props.pickFb;
        const jdata = jsondata[this.props.quiz.fragebogen];
        this.arrnew = Object.keys(jdata).map(k => jdata[k]);
        this.state = {
            id: this.arrnew[this.qno].id,
            question: this.arrnew[this.qno].frageText,
            options: this.arrnew[this.qno].options,
            correctoption: this.arrnew[this.qno].correctAnswer,
            categories: this.arrnew[this.qno].category,
            selectedAns: -1
        };
        /* durch redux Mitgabe von: 
        FB,score, richtig beantworte Fragen, falsch beantwortete Fragen, gehighlightete Fragen
        */
    }
    prev() {
        // wenn hier gno = 0 dann set.Touchableocity leer oder nicht visibale
        // gegenteilig von next() später
        if (this.qno > 0) {
          this.qno--;
          this.setState({
            id: this.arrnew[this.qno].id,
            question: this.arrnew[this.qno].frageText,
            options: this.arrnew[this.qno].options,
            correctoption: this.arrnew[this.qno].correctAnswer,
            countCheck: 0
        });
        }
      }
    next() {
        const antwort = this.state.selectedAns;
        if (this.props.quiz.arr[this.qno] === undefined) {
            this.props.selectAnswer(antwort);
            console.log('item wurde hinzugefügt');
        } else {
            this.props.updateAnswer(antwort); //Methode fehlt noch 
            console.log('item wurde geupdated');
        } 
        // hier noch verschieden Kat. scores einfügen und übergeben
        if (this.qno < this.arrnew.length - 1) {
            // bei letzter stelle touchable text nicht next sondern result
            if (this.state.selectedAns === this.state.correctoption) {
                this.score += 1;
          // hier für redux die correctAnswer,wronganswer,hightlightes übergeben
            }
            this.qno++;
            this.setState({
                countCheck: 0,
                id: this.arrnew[this.qno].id, 
                question: this.arrnew[this.qno].frageText,
                options: this.arrnew[this.qno].options,
                correctoption: this.arrnew[this.qno].correctAnswer,
                selectedAns: -1 });
        } else {
            this.props.quizFinish(this.score);
        }
    }
    answer(ans) {
        this.state.selectedAns = ans;
    } 
     /*
     
     1.score den Kategorien anpassen
     2.bei zurück umgekehrt von next machen -
     -> wenn antwort falsch bleibt score gleich, bei antwort richtig wir score einen abgezogen ;) 
     -> außerdem muss selectAns gespeicht 
        (am besten array mit id.lenght und dann neuen Index erstellen und so mitzählen) 
        bei prev muss dann index.array aufgerufen werden
        */
    
     render() {
        const radioProps = [
            { label: this.state.options.option1, value: 'option1' },
            { label: this.state.options.option2, value: 'option2' },
            { label: this.state.options.option3, value: 'option3' },
            { label: this.state.options.option4, value: 'option4' },
        ];
        /*
        let init = this.props.quiz.arr[this.qno];
        if (this.props.quiz.arr[this.qno] === null) {
           init = -1;
        }*/
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
                
                <CardSection style={{ backgroundColor: '#002D40' }}>              
                    <Text style={styles.welcome}>
                        {this.state.question}
                    </Text>                
                </CardSection>
                
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

                <View>
                    <Text color>
                        score: {this.score}
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
/*
const mapStateToProbs = ({ quiz }) => {
    return { 
        pickFb: quiz.pickFB };
};

export default connect(mapStateToProbs, actions)(QuestionPage);
*/

const mapStateToProbs = state => {
    return { quiz: state.selectedFb
    //selectedAntwort: state.selectedAntwort
    };
};

export default connect(mapStateToProbs, actions)(QuestionPage);

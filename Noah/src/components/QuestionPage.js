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
        const jdata = jsondata[this.props.selectedFragebogen];
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
                selectedAns: -1 }); // hier am besten in array schreiben
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

                <View>
                    <Text color>
                        score: {this.score}
                    </Text>
                    <Text>
                     {console.log(this.props)}
                     Fragebogen: {this.props.selectedFragebogen}
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
    return { selectedFragebogen: state.selectedFb };
};

export default connect(mapStateToProbs, actions)(QuestionPage);

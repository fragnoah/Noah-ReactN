import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Button
    } from 'react-native';
import Animbutton from '../components/common/AnimButton';
import jsondata from '../assets/datasrc/test.json';


class QuestionPage extends Component {
    constructor(props) {
        super(props);
        this.qno = 0;
        this.score = 0;
        this.selectedAns= 0;
        
        // hier muss aus redux fb1 bzw fb2 xyz abgerufen
        const jdata = jsondata.fb1;
        this.arrnew = Object.keys(jdata).map(k => jdata[k]);
        this.state = {
            id: this.arrnew[this.qno].id,
            question: this.arrnew[this.qno].frageText,
            options: this.arrnew[this.qno].options,
            correctoption: this.arrnew[this.qno].correctAnswer,
            categories: this.arrnew[this.qno].category
        };
        /* durch redux Mitgabe von: 
        FB,score, richtig beantworte Fragen, falsch beantwortete Fragen, gehighlightete Fragen
        */
    }
    prev() {
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
        if (this.qno < this.arrnew.length - 1) {
            if (this.selectedAns === this.state.correctoption) {
                this.score += 1;
            }
            this.qno++;
            this.setState({
                countCheck: 0,
                id: this.arrnew[this.qno].id, 
                question: this.arrnew[this.qno].frageText,
                options: this.arrnew[this.qno].options,
                correctoption: this.arrnew[this.qno].correctAnswer });
        } else {
            this.props.quizFinish(this.score);
        }
    }
    answer(ans) {
        this.selectedAns = ans;
    } 
    /*_answer(status, ans) { 
        if (status === true) {
            const count = this.state.countCheck + 1;
            this.setState({ countCheck: count });
            if (ans === this.state.correctoption) {
                this.score += 1;
            }
        }
    } /*
     TO-DO 
     1.nur ein Button clickbar machen -> vielleicht mit counCheck arbeiten? :/
     2.bei next button neu rendern
     3.score den Kategorien anpassen
     4.bei zurück umgekehrt von next machen -
     > wenn antwort falsch bleibt score gleich, bei antwort richtig wir score einen abgezogen ;) 
    
    */
     render() {
        let _this = this;
        const currentOptions = this.state.options;
        const options = Object.keys(currentOptions).map( function (k) {
        return (
                <View key={k} style={{ margin: 10 }}>
        
            <Animbutton countCheck={_this.state.countCheck} onColor={'green'} effect={'tada'} _onPress={() => _this.answer(k)} text={currentOptions[k]} />
     
          </View>
        );
        });
        /*
        const currentOptions = this.state.options;
        const options = Object.keys(currentOptions).map(function (k) {
            return (
                <View key={k} style={{ margin: 10 }}>
 
                    <Button
                        countCheck={this.state.countCheck} 
                        onPress={
                        (status) => this.answer(status, k)} 
                        title={currentOptions[k]} 
                    />
                </View>);
            });
            */
        return (
           <ScrollView style={{ backgroundColor: '#F5FCFF', paddingTop: 10 }}>
                <View style={styles.container}>
                    <View 
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center' }} 
                    />
       
                    <View style={styles.oval} >
                        <Text style={styles.welcome}>
                            {this.state.question}
                        </Text>
                    </View>
                    <View>
                        { options }
                    </View>
                <View style={{ flexDirection: 'row' }}>
                    <Button
                     onPress={() => this.prev()}
                     title="Prev"
                     color="#841584"
                    />
                <View style={{ margin: 15 }} />                 
                    <TouchableOpacity onPress={() => this.next()} >
                        <View 
                            style={{ paddingTop: 5,
                            paddingBottom: 5,
                            paddingRight: 20,
                            paddingLeft: 20,
                            borderRadius: 10,
                            backgroundColor: 'green' }} 
                        />
                        <Text>Next</Text>
                    </TouchableOpacity >
                    <Text>
                        {this.score}
                    </Text>
                </View>
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
export default QuestionPage;


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Button
} from 'react-native';
import Fragen from '../assets/datasrc/structure_final.json';


const { width, height } = Dimensions.get('window');
let arrnew = [];


export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.qno = 0;
    this.score = 0;
 
    const jdata = Fragen.fb1;
    arrnew = Object.keys(jdata).map( function(k) {return jdata[k]});
    this.state = {
      question: arrnew[this.qno].question,
      options: arrnew[this.qno].options,
      correctoption: arrnew[this.qno].correctoption,
      countCheck: 0
    };
    }
  
    prev() {
    if (this.qno > 0) {
      this.qno--;
      this.setState({
     question: arrnew[this.qno].question,
      options: arrnew[this.qno].options, 
      correctoption: arrnew[this.qno].correctoption });
    }
  }
  next() {
    if (this.qno < arrnew.length-1) {
      this.qno++;
 
      this.setState({ 
          countCheck: 0, 
          question: arrnew[this.qno].question, 
          options: arrnew[this.qno].options, 
          correctoption: arrnew[this.qno].correctoption });
    } else {
      
      this.props.quizFinish(this.score*100/5)
     }
  }
  _answer(status, ans) {
    if (status === true) {
        const count = this.state.countCheck + 1;
        this.setState({ countCheck: count });
        if (ans === this.state.correctoption); 
        {
          this.score += 1;
        }
      } else {
        const count = this.state.countCheck - 1;
        this.setState({ countCheck: count });
        if (this.state.countCheck < 1 || ans === this.state.correctoption){
        this.score -= 1;
       }
      }
  }
  render() {
    let _this = this;
    const currentOptions = this.state.options;
    const options = Object.keys(currentOptions).map( function(k) {
      return ( 
           <View key={k} style={{margin:10}}>
 
        
 
      </View>)
    });
 
    return (
      <ScrollView style={{backgroundColor: '#F5FCFF',paddingTop: 10}}>
      <View style={styles.container}>
 
      <View style={{ flex: 1,flexDirection: 'column', justifyContent: "space-between", alignItems: 'center',}}>
 
      <View style={styles.oval} >
        <Text style={styles.welcome}>
          {this.state.question}
        </Text>
     </View>
        <View>
        { options }
        </View>
        <View style={{flexDirection:"row"}}>
      {/*   <Button
          onPress={() => this.prev()}
          title="Prev"
          color="#841584"
        />
        <View style={{margin:15}} />*/}
 
        <TouchableOpacity onPress={() => this.next()} >
          <View style={{paddingTop: 5,paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius:10, backgroundColor:"green"}}>
    
          </View>
        </TouchableOpacity >
 
        </View>
        </View>
      </View>
      </ScrollView>
    );
  }
}
 
const styles = StyleSheet.create({
 
  oval: {
  width: width*90/100,
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
    color: "white"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Button
    } from 'react-native';
import jsondata from '../assets/datasrc/structure_final.json';


class QuestionPage extends Component {
    constructor(props) {
        super(props);
        this.qno = 0;
        this.score = 0;
        
        const jdata = jsondata.fb1;
        const arrnew = Object.keys(jdata).map(function(k) { return jdata[k]; });
        this.state = {
          question: arrnew[this.qno].frageText,
          options: arrnew[this.qno].options,
          correctoption: arrnew[this.qno].correctAnswer,
          countCheck: 0
        };
    }
    render() {
        
        const currentOptions = this.state.options;
        const options = Object.keys(currentOptions).map(function(k) {
            return (
                <View key={k} style={{ margin: 10 }}>
 
                    <Button 
                        onPress={
                        (status) => this.answer(status, k)} 
                        title={currentOptions[k]} 
                    />
         
                </View>);
            });

        return (
           
           <ScrollView style={{ backgroundColor: '#F5FCFF', paddingTop: 10 }}>
            <View style={styles.container}>
       
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }} />
       
            <View style={styles.oval} >
              <Text style={styles.welcome}>
                {this.state.question}
              </Text>
           </View>
              <View>
              { options }
              </View>
              <View style={{ flexDirection: 'row' }}>
            {/*   <Button
                onPress={() => this.prev()}
                title="Prev"
                color="#841584"
              />
              <View style={{margin:15}} />*/}
       
              <TouchableOpacity onPress={() => this.next()} >
                <View style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius: 10, backgroundColor: 'green' }} />
              </TouchableOpacity >
              </View>
              </View>
            </ScrollView>
          );
        }
      }
         
const styles = StyleSheet.create({
 
    oval: {
    
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


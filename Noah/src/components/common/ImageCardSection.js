import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { CardSection } from './CardSection';

/*
const getImage = (image) => {
  return (
    <View style={styles.imgContStyle}>
      <Image 
        style={styles.imgStyle} 
        //source={require(s)} // geht nicht
        //source={require('../assets/img/NOAH_LoadScreen.png')}
        //source={{ 
        //  isStatic: true, 
        //  uri: 'file:///storage/emulated/0/hase.png', 
        //}}  //URL's OK              
        source={{ uri: image }}
      />
    </View>
  );
};

const getQuestion = (id, text) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      <Text style={styles.idTextStyle} >
        id: {id}
      </Text>
      <Text style={styles.questionTextStyle} >
        {text}
      </Text>
    </View>
  );
};
*/
class ImageCardSection extends Component {

  renderID(id) {
    if (id !== '' && id !== undefined) {
      return (
        <Text style={styles.idTextStyle} >
            id: {id}
          </Text>
      );
    } 
  } 

  renderBuchRef(buchRef) {
    if (buchRef !== '' && buchRef !== undefined) {
      return (
        <Text style={styles.BuchRefText}>Buchreferenz: {buchRef} </Text>
      );
    }
  }

  renderImage(image) {
    if (image !== '' && image !== undefined) {
      return (
        <View style={styles.imgContStyle}>
        <Image 
          style={styles.imgStyle}              
          source={{ uri: image }}
        />
      </View>
      );
    } 
  }

  renderText(text) {
    if (text !== '' && text !== undefined) {
      console.log('renderText_Frage: ', text);
      return (
        <Text style={styles.questionTextStyle} >
            {text}
        </Text>
      );
    }
  }

  render() {
    console.log('Frage: ', this.props);
    const { image, text, id, buchRef } = this.props;
    //getQuestion(text, id);
    return (
      <CardSection style={[this.props.style]}>
        <View style={styles.containerStyle}>
          {this.renderID(id)}
          {this.renderText(text)}
        </View>
        {this.renderImage(image)}
        {this.renderBuchRef(buchRef)}
      </CardSection>
    );     
  }
}
//const ImageCardSection = (props) => {

const styles = {
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',

  },
  idTextStyle: {
    fontSize: 12,
    color: '#8f8f8f'
  },
  questionTextStyle: {
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 5,
    flex: 1
  },
  imgContStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imgStyle: {
    height: 75,
    width: 75,
    resizeMode: 'contain'   
  },
  BuchRefText: {
    fontStyle: 'italic',
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 5,
    flex: 1
  }
};

export { ImageCardSection };

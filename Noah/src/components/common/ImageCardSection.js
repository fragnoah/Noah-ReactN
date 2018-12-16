import React from 'react';
import { View, Text, Image } from 'react-native';
import { CardSection } from './CardSection';

/*
const getImage = (image) => {
  return (
    <View style={styles.imgContStyle}>
      <Image 
        style={styles.imgStyle} 
        //source={require(s)}
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

const ImageCardSection = (props) => {
  const { image, text, id } = props;
  console.log(props);

  if (image == '') {
    //getQuestion(text, id);
    return (
      <CardSection style={[props.style]}>
        <View style={styles.containerStyle}>
          <Text style={styles.idTextStyle} >
            id: {id}
          </Text>
          <Text style={styles.questionTextStyle} >
            {text}
          </Text>
        </View>
      </CardSection>
    );
  } else {
    //getQuestion(text, id);
    //getImage(image);
    return (
      <CardSection style={[props.style]}>
        <View style={styles.containerStyle}>
          <Text style={styles.idTextStyle} >
            id: {id}
          </Text>
          <Text style={styles.questionTextStyle} >
            {text}
          </Text>
        </View>
        <View style={styles.imgContStyle}>
          <Image 
            style={styles.imgStyle}              
            source={{ uri: image }}
          />
        </View>
      </CardSection>
    );
  }
};

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
  }
};

export { ImageCardSection };

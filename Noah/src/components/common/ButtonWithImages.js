import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  View
 } from 'react-native';


class ButtonWithImage extends Component {
//= ({ onPress, imgLeft,buttonText, imgRight, buttonStyle, imageStyle, textSyle }) => {

  renderLeftImg(imgLeft, imageStyle, removeEmptyImage) {
    if (imgLeft !== '' && imgLeft !== undefined) {
      return (
        <View style={styles.imgContStyle}>
          <Image style={[styles.imageStyle, imageStyle]} source={imgLeft} />
        </View>
      );
    } 
    
    if (removeEmptyImage === undefined) {
      return (
        <View style={styles.imgContStyle}>
          <Image style={[styles.imageStyle, imageStyle]} source={imgLeft} />
        </View>
      );
    }
  }

  renderRightImg(imgRight, imageStyle, removeEmptyImage) {
    if (imgRight !== '' && imgRight !== undefined) {
      return (
        <View style={styles.imgContStyle}>
          <Image style={[styles.imageStyle, imageStyle]} source={imgRight} />
        </View>
      );
    } 
    
    if (removeEmptyImage === undefined) {
      return (
        <View style={styles.imgContStyle}>
          <Image style={[styles.imageStyle, imageStyle]} source={imgRight} />
        </View>
      );
    }
  }

  renderText(buttonText, textStyle) {
    if (buttonText !== '' || buttonText !== undefined) {
      return (
        <View style={styles.textContStyle}>
          <Text style={[styles.textStyle, textStyle]}>{buttonText}</Text>
        </View>
      );
    }
  }

  renderElements(
      imageStyle,
      imgLeft,
      imgRight,
      buttonText,
      textStyle,
      removeEmptyImage
    ) {
    return (
      <View style={styles.containerStyle}>
        {this.renderLeftImg(imgLeft, imageStyle, removeEmptyImage)}
        {this.renderText(buttonText, textStyle)}
        {this.renderRightImg(imgRight, imageStyle, removeEmptyImage)}
      </View>
    );
  }

  render() {
    console.log(this.props);
    const {
      onPress,
      buttonStyle,
      imageStyle,
      imgLeft,
      imgRight,
      buttonText,
      textStyle,
      disabled,
      removeEmptyImage
    } = this.props;

    if (disabled) {
      styles.actButtonStyle = styles.disabledButtonStyle;
    } else {
      styles.actButtonStyle = styles.buttonStyle;
    }

    return (
      <TouchableOpacity 
        disabled={disabled} 
        onPress={onPress} 
        style={[styles.actButtonStyle, buttonStyle]}
      >
        {this.renderElements(
            imageStyle, 
            imgLeft, 
            imgRight, 
            buttonText, 
            textStyle, 
            removeEmptyImage
          )}
      </TouchableOpacity>
    );
  }

}

const styles = {
  imageStyle: {
    height: 70,
    width: 70,
   
    resizeMode: 'contain',
    //elevation: 1,
  },
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between', //'flex-start',    
    padding: 5,
   },
  buttonStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    //justifyContent: 'space-around',
    //flex: 0,
    //alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    elevation: 1,
  },
  disabledButtonStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    //justifyContent: 'space-around',
    //flex: 0,
    //alignSelf: 'stretch',
    backgroundColor: 'rgba(143,143,143,0.75)',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    elevation: 1,
  },
  actButtonStyle: {},
  textStyle: {
    justifyContent: 'flex-start',
    color: '#007aff',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: '600',
  },
  textContStyle: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginLeft: 5,
    marginRight: 5
  },
  imgContStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  emptyImage: {
    height: 1,
    width: 1,
    padding: 0,
    margin: 0, 
    resizeMode: 'stretch',
  }
};

export { ButtonWithImage };

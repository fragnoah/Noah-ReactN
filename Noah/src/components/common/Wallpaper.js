import React, { Component } from 'react';
import { ImageBackground, View } from 'react-native';

class Wallpaper extends Component {

  render() {
    return (
      <ImageBackground
        source={require('./assets/img/NOAH_LoadScreen.png')}
        style={styles.backgroundImage}
      >    
        {props.children}
      </ImageBackground>
    );
  };
}


const styles = {
 backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    }
};

export { Wallpaper };

import React from 'react';
import { 
  TouchableOpacity,
  Image
 } from 'react-native';


const ImageButton = ({ onPress, img, buttonStyle, imageStyle }) => {  
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, buttonStyle]}>
      <Image style={[styles.imageStyle, imageStyle]} source={img} />
    </TouchableOpacity>
  );
};

const styles = {
  imageStyle: {
    height: 50,
    width: 50
  },
  buttonStyle: {
    flex: 0,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5
  }
};

export { ImageButton };

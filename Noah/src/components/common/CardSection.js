import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
<<<<<<< HEAD
    justifyContent: 'flex-start',
    flexDirection: 'row',
=======
    display: 'flex',
    justifyContent: 'space-around',
    //flexDirection: 'row',
>>>>>>> ddbf39451b640ee054f42f7cbf2fc3e34072a99e
    borderColor: '#ddd',
    position: 'relative'
  }
};

export { CardSection };

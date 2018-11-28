//import React, { Component } from 'react';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { CardSection } from '../common';

const ListItem = (props) => {
    return (
            //<TouchableWithoutFeedback onPress={this}>
            <TouchableOpacity onPress={props.onPress} >
                <CardSection style={styles.rowStyle}>
                    <Text style={styles.titleStyle}>
                        {props.children}
                    </Text>
                </CardSection>
            </TouchableOpacity>

    );
};

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
    color: '#FFFFFF'
  }, 
  rowStyle: {
    flex: 0,
    backgroundColor: '#1562E7',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  }
};

export { ListItem };

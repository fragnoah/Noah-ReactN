//import React, { Component } from 'react';
import React from 'react';
<<<<<<< HEAD
import { Text, TouchableOpacity } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { CardSection } from '../common';

const ListItem = (props) => {
=======
import { Text, TouchableOpacity, TouchableHighlight } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { CardSection } from '../common';

export const ListItem = (props) => {
>>>>>>> ddbf39451b640ee054f42f7cbf2fc3e34072a99e
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

<<<<<<< HEAD
=======
export const ListRadio = (props) => { 
  return (
    <TouchableHighlight
      accessible={true}
      accessibilityLabel="Tap me!"
      onPress={this.props.onPress}
    >
        <CardSection style={styles.rowStyle}>
          <Text style={styles.titleStyle}>
            {props.children}
          </Text>
        </CardSection>
    </TouchableHighlight>
  );
};

>>>>>>> ddbf39451b640ee054f42f7cbf2fc3e34072a99e
/*
class ListItem { children } extends Component {
  onRowPress() {
    
    // TODO: Implement Kapitel
    Actions.employeeEdit({ employee: this.props.employee });
  }

  render() {
    const { name } = this.props.employee;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {name}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
*/

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
<<<<<<< HEAD

export { ListItem };
=======
>>>>>>> ddbf39451b640ee054f42f7cbf2fc3e34072a99e

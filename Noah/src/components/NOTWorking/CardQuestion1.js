import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
//import { connect } from 'react-redux';
import { Card, Cardsection } from '../common';
//import { choiceUpdate } from '../actions';
 

class CardQuestion extends Component {
  render() {
    //const { img, quest } = this.props.question;
    const { quest } = this.props.question;
    console.log(this.props.question);
    //if (img == null) {
      return (
        <Card>
          <Cardsection>
            <View tyle={styles.headerContentStyle}>
              <Text>{quest}</Text>
            </View>
          </Cardsection>      
        </Card>      
      );
    /*  
    } else {
      return (
        <Card>
          <Cardsection>
            <View style={styles.thumbnailContainerStyle}>
              <Image
                style={styles.thumbnailStyle}
                source={{ uri: img }}
              />
            </View>
            <View style={styles.headerContentStyle}>
              <Text>{quest}</Text>
            </View>
          </Cardsection>      
        </Card>   
      );
    }
    */
  }  
}
/*

export const QCard = ({ quest }) => {
    return (
      <Card>
        <Cardsection>
          <View tyle={styles.headerContentStyle}>
            <Text>{quest}</Text>
          </View>
        </Cardsection>      
      </Card>      
    );
};

export const QImgCard = ({ img, quest }) => {
    return (
      <Card>
        <Cardsection>
          <View style={styles.thumbnailContainerStyle}>
            <Image
              style={styles.thumbnailStyle}
              source={{ uri: img }}
            />
          </View>
          <View style={styles.headerContentStyle}>
            <Text>{quest}</Text>
          </View>
        </Cardsection>      
      </Card>   
    );
};  
*/
const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  }
};

export default CardQuestion;

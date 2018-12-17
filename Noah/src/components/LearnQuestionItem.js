import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection, ImageCardSection } from './common';
import * as actions from '../actions';
// import CacheImage from './CacheImage';

class LearnQuestionItem extends Component {
  
  componentWillUpdate() {
    LayoutAnimation.spring();
  }
  
  getRightAnswer() {
    const { correctAnswer, options } = this.props.question;
    switch (correctAnswer) {
      case 'option1':
        return (options.option1);
      case 'option2':
        return (options.option2);
      case 'option3':
        return (options.option3);
      case 'option4':
        return (options.option4);
      default:
        return ('keine gültige Option');
    }
  }

  renderDescription() {
    const { expanded } = this.props;
    const { solve, image } = this.props.question;

    if (expanded) {
      console.log(image);
      console.log(Image.resolveAssetSource(image));
      return (
        
        <CardSection style={styles.descriptionStyle}>
          <Text style={styles.boldText}>Antwort: </Text>
          <Text >{this.getRightAnswer()} </Text>
          <Text style={styles.boldText}>Begründung: </Text>
          <Text > {solve} </Text>         
        </CardSection>
      );
    }
  }

  render() {
    const { id, frageText } = this.props.question;
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.selectQuestion(id)}
      >
        <View>
          <ImageCardSection id={id} text={frageText} image={this.props.question.image} />
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  descriptionStyle: {
    paddingLeft: 15,
    paddingRight: 5,
    flex: 1
  }, 
  boldText: {
    fontWeight: 'bold'
  }
};

const mapStateToProps = (state, ownProps) => {
  const expanded = state.solveSelectedQuestionID === ownProps.question.id;

  return { expanded };
};

export default connect(mapStateToProps, actions)(LearnQuestionItem);

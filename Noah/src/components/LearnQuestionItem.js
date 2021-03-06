import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection, ImageCardSection } from './common';
import * as actions from '../actions';
import { learnItemStyles } from './styleSheets';
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

  renderBuchRef(buchRef) {
    if (buchRef !== '') {
      return (
        <Text style={learnItemStyles.kursivText}>Buchreferenz: {buchRef} </Text>
      );
    }
  }

  renderSolve(solve) {
    if (solve !== '') {
      return (
        <View>
          <Text style={learnItemStyles.boldText}>Begründung: </Text>
          <Text > {solve} </Text>  
        </View>
      );
    }
  }

  renderDescription() {
    const { expanded } = this.props;
    const { solve, buchRef } = this.props.question;

    if (expanded) {
      return (        
        <CardSection style={learnItemStyles.descriptionStyle}>
          <Text style={learnItemStyles.boldText}>Antwort: </Text>
          <Text >{this.getRightAnswer()} </Text>
          {this.renderSolve(solve)}  
          {this.renderBuchRef(buchRef)}     
        </CardSection>
      );
    }
  }

  render() {
    const { id, frageText, image } = this.props.question;
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.selectQuestion(id)}
      >
        <View>
          <ImageCardSection 
            id={id} 
            text={frageText} 
            image={image} 
            buchRef={''}
          />
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const expanded = state.solveSelectedQuestionID === ownProps.question.id;

  return { expanded };
};

export default connect(mapStateToProps, actions)(LearnQuestionItem);

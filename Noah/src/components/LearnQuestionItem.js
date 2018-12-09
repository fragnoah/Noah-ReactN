import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';

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
    const { solve } = this.props.question;

    if (expanded) {
      return (
        <CardSection>
          <Text sytle={{ flex: 1 }}>
            Antwort: {this.getRightAnswer()}
          </Text>
          <Text style={{ flex: 1 }}>
            Begründung: {solve}
          </Text>
        </CardSection>
      );
    }
  }

  render() {
    const { titleStyle } = styles;
    const { id, frageText } = this.props.question;
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.selectQuestion(id)}
      >
        <View>
          <CardSection>
            <Text style={titleStyle}>
              {id}. {frageText}
            </Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  descriptionStyle: {
    paddingLeft: 10,
    paddingRight: 10
  }
};

const mapStateToProps = (state, ownProps) => {
  const expanded = state.solveSelectedQuestionID === ownProps.question.id;

  return { expanded };
};

export default connect(mapStateToProps, actions)(LearnQuestionItem);

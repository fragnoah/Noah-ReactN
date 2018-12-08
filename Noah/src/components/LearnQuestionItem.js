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
  
 
  renderDescription() {
    const { solve, expanded } = this.props;

    if (expanded) {
      return (
        <CardSection>
          <Text style={{ flex: 1 }}>
            {solve.description}
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
              {frageText}
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
  const expanded = state.selectedLibraryId === ownProps.question.id;

  return { expanded };
};

export default connect(mapStateToProps, actions)(LearnQuestionItem);

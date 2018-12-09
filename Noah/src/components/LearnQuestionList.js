import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import LearnQuestionItem from './LearnQuestionItem';

class LearnQuestionList extends Component {
  constructor(props) {
    super();
    if (props.fromID != null) {
      this.fromID = props.fromID;
    } else {
      this.fromID = 0;
    }
    if (props.toID != null) {
      this.toID = props.toID;
    } else {
      this.toID = 300;
    }
    console.log(this.fromID, this.toID);
  }

  renderItem(question) {
    console.log('QuestionID: ', question.item.id);
    console.log('FromID: ', this.fromID, this.toID);
    if (question.item.id >= this.fromID && question.item.id <= this.toID) {
    return <LearnQuestionItem question={question.item} />;
    } else {
      return null;
    }
  }

  render() {
    console.log(this.fromID, this.toID);
    return (
      <FlatList
        data={this.props.pool}
        renderItem={this.renderItem}
        keyExtractor={question => String(question.id)}
        extraData={this.state}
      />
    );
  }
}

const mapStateToProps = state => {
  return { pool: state.pool };
};

export default connect(mapStateToProps)(LearnQuestionList);

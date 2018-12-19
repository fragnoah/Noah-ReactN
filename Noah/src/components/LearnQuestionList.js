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


    //console.log(this.fromID, this.toID);
  }

  generateActualPool() {
    if (this.props.fromID == null || this.props.toID == null) {
      this.newPool = this.props.pool;
    } else {
      const jdata = this.props.pool;
      let tempPool = Object.keys(jdata).map(k => jdata[k]);
      // console.log(tempPool);
      let i;
      let secPool = [];
      for (i = 0; i < tempPool.length; i++) {
        // console.log('tempPool.ID: ', tempPool[i].id);
        if (tempPool[i].id >= this.fromID && tempPool[i].id <= this.toID) {
          secPool.push(tempPool[i]);
        }
      }
      this.newPool = secPool;
      // console.log('newPool: ', this.newPool);
    }
  }

  renderItem(question) {
    return <LearnQuestionItem question={question.item} />;
  }

  render() {
    this.generateActualPool();
    return (
      <FlatList
        data={this.newPool}
        renderItem={this.renderItem}
        keyExtractor={question => String(question.id)}
      />
    );
  }
}

const mapStateToProps = state => {
  return { pool: state.pool };
};

export default connect(mapStateToProps)(LearnQuestionList);

import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import LearnQuestionItem from './LearnQuestionItem';

class LearnQuestionList extends Component {
  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(this.props.pool);
  }

  renderRow(question) {
    return <LearnQuestionItem question={question} />;
  }

  render() {
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  return { pool: state.pool };
};

export default connect(mapStateToProps)(LearnQuestionList);

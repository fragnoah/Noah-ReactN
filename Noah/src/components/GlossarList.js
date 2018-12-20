import React, { Component } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import GlossarSection from './GlossarSection';

class GlossarList extends Component {

  renderItem(glossar) {
    return <GlossarSection glossar={glossar.item} />;
  }

  render() {
    //console.log(this.props);
    return (
      <ScrollView>
        <FlatList 
          data={this.props.glossary}
          renderItem={this.renderItem}
          keyExtractor={(glossar) => glossar.key}
        />
      </ScrollView>
    ); 
  }
}

const mapStateToProps = state => {
  return { glossary: state.glossary };
};

export default connect(mapStateToProps)(GlossarList);

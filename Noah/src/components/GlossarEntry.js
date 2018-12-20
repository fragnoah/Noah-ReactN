import React, { Component } from 'react';
import {
  FlatList,
  LayoutAnimation,
  } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import GlossarItem from './GlossarItem';
// import CacheImage from './CacheImage';

class GlossarEntry extends Component {

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderItem(item) {
    //console.log('Item rendern', item);
    return <GlossarItem item={item.item} />;
    //return <GlossarSection glossar={glossar.item} />;
  }
    
  render() {
    //console.log('Entryprops ', this.props);
    return (
      <FlatList 
          data={this.props.entry}
          renderItem={this.renderItem}
          keyExtractor={(entry) => entry.title}
      />
    ); 
  } 
}

export default connect(null, actions)(GlossarEntry);
//export default connect(mapStateToProps, actions)(GlossarEntry);

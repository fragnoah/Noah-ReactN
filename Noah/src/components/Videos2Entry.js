import React, { Component } from 'react';
import {
  FlatList,
  LayoutAnimation,
  } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Videos2Item from './Videos2Item';
// import CacheImage from './CacheImage';

/**
 * @brief Strukturierung analog zum Glossar
 * @author Vickry Mukhtar
 */

class Videos2Entry extends Component {

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderItem(item) {
    //console.log('Item rendern', item);
    return <Videos2Item item={item.item} />;
    //return <Videos2Section videos2={videos2.item} />;
  }
    
  render() {
    console.log(this.props)
    //console.log('Entryprops ', this.props);
    return (
      <FlatList 
          data={this.props.entry}
          renderItem={this.renderItem}
          keyExtractor={(entry) => entry.title}
          //horizontal={true}
      />
    ); 
  } 
}

export default connect(null, actions)(Videos2Entry);
//export default connect(mapStateToProps, actions)(Videos2Entry);

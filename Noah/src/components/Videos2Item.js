import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation,
  } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, ImageCardSection } from './common';
import * as actions from '../actions';
// import CacheImage from './CacheImage';
import { videos2Style } from './styleSheets';
import VideoDetail from './VideoDetail';

/**
 * @brief Strukturierung analog zum Glossar
 * @author Vickry Mukhtar
 */

class Videos2Section extends Component {

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderDescription() {
    const { artist, title, thumbnail_image } = this.props.item;
    //if (this.props.videos2.key === this.props.selectedVideos2Section) { 
    //if (this.props.expanded) {
      return (
        <ImageCardSection 
          //text={artist} 
          
          
        />
      );
    }
  //}
    
  render() {
    const { title } = this.props.item;
    var item = this.props.item;
    console.log(this.props); //gucken was in props stehs -> inhalt dann in video = {..} schreiben
    return (
      <TouchableWithoutFeedback
      onPress={() => this.props.selectVideos2Title(title)}
      
      >
        <View>
        <VideoDetail key={title} video={item} />

          
          {this.renderDescription()}
        </View>
    </TouchableWithoutFeedback>
      );
  }

}

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedVideos2Title === ownProps.item.title;
  //return { selectedVideos2Section: state.selectedVideos2Section };
  return { expanded };
};

export default connect(mapStateToProps, actions)(Videos2Section);

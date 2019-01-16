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
import { glossaryStyle } from './styleSheets';

class GlossarSection extends Component {

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderDescription() {
    const { description, image, buchRef } = this.props.item;
    //if (this.props.glossar.key === this.props.selectedGlossarSection) { 
    if (this.props.expanded) {
      return (
        <ImageCardSection 
          text={description} 
          image={image} 
          buchRef={buchRef}
          textStyle={glossaryStyle.descriptionTextStyle}
        />
      );
    }
  }
    
  render() {
    const { title } = this.props.item;

    return (
      <TouchableWithoutFeedback
      onPress={() => this.props.selectGlossaryTitle(title)}
      >
        <View>
          <CardSection style={glossaryStyle.itemContainer}>
            <Text style={glossaryStyle.sectionTitle}>{title}</Text>
          </CardSection>
          {this.renderDescription()}
        </View>
    </TouchableWithoutFeedback>
      );
  }

}

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedGlossarTitle === ownProps.item.title;
  //return { selectedGlossarSection: state.selectedGlossarSection };
  return { expanded };
};

export default connect(mapStateToProps, actions)(GlossarSection);

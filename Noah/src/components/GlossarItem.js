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

class GlossarSection extends Component {

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderDescription() {
    const { description, image } = this.props.item;
    //if (this.props.glossar.key === this.props.selectedGlossarSection) { 
    if (this.props.expanded) {
      return (
        <ImageCardSection text={description} id={null} image={image} />
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
          <CardSection>
            <Text>{title}</Text>
          </CardSection>
          {this.renderDescription()}
        </View>
    </TouchableWithoutFeedback>
      );
  }

}

const styles = {
  descriptionStyle: {
    paddingLeft: 15,
    paddingRight: 5,
    flex: 1
  }, 
  boldText: {
    fontWeight: 'bold'
  }
};

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedGlossarTitle === ownProps.item.title;
  //return { selectedGlossarSection: state.selectedGlossarSection };
  return { expanded };
};

export default connect(mapStateToProps, actions)(GlossarSection);

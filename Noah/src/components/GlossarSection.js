import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation,
  } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';
// import CacheImage from './CacheImage';
import GlossarEntry from './GlossarEntry';
import { glossaryStyle } from './styleSheets';

class GlossarSection extends Component {

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderSection() {
    //if (this.props.glossar.key === this.props.selectedGlossarSection) { 
    if (this.props.expanded) {
      return (
        <GlossarEntry entry={this.props.glossar.data} />
      );
    }
  }
    
  render() {
    const { key } = this.props.glossar;
    const { sectionContainer, sectionTitle } = glossaryStyle;

    //console.log(this.props);
    return (
      <TouchableWithoutFeedback
      onPress={() => this.props.selectGlossarySection(key)}
      >
        <View>
          <CardSection style={sectionContainer}>
            <Text style={sectionTitle}>{key}</Text>
          </CardSection>
          {this.renderSection()}
        </View>
    </TouchableWithoutFeedback>
      );
  }

}

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedGlossarSection === ownProps.glossar.key;
  //return { selectedGlossarSection: state.selectedGlossarSection };
  return { expanded };
};

export default connect(mapStateToProps, actions)(GlossarSection);

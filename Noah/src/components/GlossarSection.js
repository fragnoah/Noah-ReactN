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

    //console.log(this.props);
    return (
      <TouchableWithoutFeedback
      onPress={() => this.props.selectGlossarySection(key)}
      >
        <View>
          <CardSection style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{key}</Text>
          </CardSection>
          {this.renderSection()}
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
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#8CD6FC'
  },
  sectionContainer: {
    backgroundColor: '#8CD6FC',
    paddingTop: 5,
    paddingBottom: 5
  }
};

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedGlossarSection === ownProps.glossar.key;
  //return { selectedGlossarSection: state.selectedGlossarSection };
  return { expanded };
};

export default connect(mapStateToProps, actions)(GlossarSection);

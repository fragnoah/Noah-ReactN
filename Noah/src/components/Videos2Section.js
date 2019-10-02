import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  LayoutAnimation,
  StyleSheet,
  } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';
// import CacheImage from './CacheImage';
import Videos2Entry from './Videos2Entry';
import { videos2Style } from './styleSheets';
import { ActionConst } from 'react-native-router-flux';
import MainMenu from './MainMenu';

/**
 * @brief Strukturierung analog zum Glossar
 * @author Vickry Mukhtar
 */

const styles = StyleSheet.create({
  stretch: {
    width: '100%',
    height: 200,
    resizeMode: 'contain'
  }
});

class Videos2Section extends Component {

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  

  renderSection() {
    //if (this.props.videos2.key === this.props.selectedVideos2Section) { 


        //muss nochgeändert werden!!!!!
        //if (this.props.expanded) {
      return (
        <Videos2Entry entry={this.props.videos2.data} />
      );
    }
  //}
    
  render() {
    const { key } = this.props.videos2;
    const { sectionContainer, sectionTitle } = videos2Style;

    //console.log(this.props);
    return (
      <TouchableWithoutFeedback
      onPress={() => this.props.selectVideos2Section(key)}
      >
        <View>
          <CardSection style={sectionContainer}>
            
            

              <Image 
                style={styles.stretch}
                
                source={require('../assets/img/Logo.png')}
               />
          <Text style={ sectionTitle}
           //onPress= {() => Action.menu()}
          >{'Youtube Kategorie:       '+key}</Text>
          </CardSection>
          {this.renderSection()}
        </View>
    </TouchableWithoutFeedback>
      );
  }

}

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedVideos2Section === ownProps.videos2.key;
  //return { selectedVideos2Section: state.selectedVideos2Section };
  return { expanded };
};

export default connect(mapStateToProps, actions)(Videos2Section);

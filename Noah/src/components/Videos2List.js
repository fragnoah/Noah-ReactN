import React, { Component } from 'react';
import { FlatList, ScrollView, Platform, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import Videos2Section from './Videos2Section';
import { iosFix } from '../utils';

/**
 * @brief Strukturierung analog zum Glossar
 * @author Vickry Mukhtar
 */

class Videos2List extends Component {

  renderItem(videos2) {
    return <Videos2Section videos2={videos2.item} />;
  }

  renderContent() {
    console.log(this.props);
    return (
      <ScrollView  
      >
        <FlatList 
          horizontal={true}

          data={this.props.videos2}
          renderItem={this.renderItem}
          keyExtractor={(videos2) => videos2.key}
        />
      </ScrollView>
    ); 
  }

  render() {
      if (Platform.OS === 'ios') {
          return (
              <ImageBackground
                  source={iosFix.path}
                  style={iosFix.style}
              >
                  {this.renderContent()}
              </ImageBackground>
          );
      }
      return (
          this.renderContent()
      );
    }      
}

const mapStateToProps = state => {
  return { videos2: state.videos2 };
};

export default connect(mapStateToProps)(Videos2List);

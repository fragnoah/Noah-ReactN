import React, { Component } from 'react';
import { FlatList, View, ScrollView, Platform, ImageBackground } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import GlossarSection from './GlossarSection';
import { iosFix } from '../utils';


class GlossarList extends Component {



  renderItem(glossar) {
    return <GlossarSection glossar={glossar.item} />;
  }


  renderContent() {
    console.log(this.props);


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
  return { glossary: state.glossary };
};

export default connect(mapStateToProps)(GlossarList);

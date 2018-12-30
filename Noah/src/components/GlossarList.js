import React, { Component } from 'react';
import { FlatList, ScrollView, Platform, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import GlossarSection from './GlossarSection';

class GlossarList extends Component {

  renderItem(glossar) {
    return <GlossarSection glossar={glossar.item} />;
  }

  renderContent() {
    //console.log(this.props);
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

const iosFix = {
    style: {
        flex: 1,
        resizeMode: 'cover',
    },
    path: require('../assets/img/NOAH_Wallpaper.png'),
};

const mapStateToProps = state => {
  return { glossary: state.glossary };
};

export default connect(mapStateToProps)(GlossarList);

import React, { Component } from 'react';
import { ScrollView, Platform, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import VideoDetail from './VideoDetail';
import { iosFix } from '../utils';

class VideoList extends Component {
  
  renderAlbums() {
    return this.props.videoindex.map(video =>
      <VideoDetail key={video.title} video={video} />
    );
  }

  renderContent() {
    console.log('Videolist_state', this.props.videoindex);

    return (
      <ScrollView>
        {this.renderAlbums()}
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
  console.log(state);
  return { videoindex: state.videoindex };
};

export default connect(mapStateToProps)(VideoList);

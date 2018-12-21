import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import VideoDetail from './VideoDetail';

class VideoList extends Component {
  
  renderAlbums() {
    return this.props.videoindex.map(video =>
      <VideoDetail key={video.title} video={video} />
    );
  }

  render() {
    console.log('Videolist_state', this.props.videoindex);

    return (
      <ScrollView>
        {this.renderAlbums()}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return { videoindex: state.videoindex };
};

export default connect(mapStateToProps)(VideoList);

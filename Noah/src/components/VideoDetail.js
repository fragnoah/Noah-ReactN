import React, { Component } from 'react';
import { Text, View, Image, Linking } from 'react-native';
import { Card, CardSection, ImageButton } from './common/';
import { videoItemStyle } from './styleSheets';

class VideoDetail extends Component {

  renderThumbnail(thumbnailImage) {
    if (thumbnailImage !== '' && thumbnailImage !== undefined) {
      return (
        <View style={videoItemStyle.thumbnailContainerStyle}>
          <Image
            style={videoItemStyle.thumbnailStyle}
            source={{ uri: thumbnailImage }}
          />
        </View>
      );
    } 
  }

  render() {
    const { title, artist, thumbnail_image, duration, url } = this.props.video;
      const {
        headerContentStyle,
        headerTextStyle,
        containerStyle
      } = videoItemStyle;
    return (
      <Card cardStyle={{ borderRadius: 5 }}>
        <CardSection style={containerStyle}>
          {this.renderThumbnail(thumbnail_image)}
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}>{title}</Text>
            <Text>{artist}</Text>
            <Text>Dauer: {duration}</Text>
          </View>
          <ImageButton 
            onPress={() => Linking.openURL(url)}
            img={require('../assets/img/play.png')}
          />
        </CardSection>
      </Card>
    );
  }  
}

export default VideoDetail;

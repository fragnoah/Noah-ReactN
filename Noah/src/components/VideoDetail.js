import React, { Component } from 'react';
import { Text, View, Image, Linking } from 'react-native';
import { Card, CardSection, ImageButton } from './common/';

class VideoDetail extends Component {

  renderThumbnail(thumbnailImage) {
    if (thumbnailImage !== '' && thumbnailImage !== undefined) {
      return (
        <View style={styles.thumbnailContainerStyle}>
          <Image
            style={styles.thumbnailStyle}
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
      } = styles;
    return (
      <Card>
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

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  },
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export default VideoDetail;

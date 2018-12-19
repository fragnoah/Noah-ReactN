// Dyn. Zuweisung möglich ... aber keinen plan, wo die Images (zentral) abgelegt werden müssen
// ZUweisungsbeispiel: <CacheImage uri='img/hase.png' />
import React from 'react';
import { Image, Platform } from 'react-native'; 
import shorthash from 'shorthash';

const RNFS = require('react-native-fs');

class CacheImage extends React.Component {
    state = { source: null }

    componentDidMount() {
        console.log(this.props);
        const { uri } = this.props; 
        const name = shorthash.unique(uri);
        const extension = (Platform.OS === 'android') ? 'file://' : ''; 
        //const path = `${extension}${RNFS.CachesDirectoryPath}/${name}.png`;
        const path = `${extension}${RNFS.DocumentDirectoryPath}/${uri}`;
        
        console.log(path);

        RNFS.exists(path).then(exists => {
            if (exists) this.loadFile(path);
            else this.downloadFile(uri, path);
        });
    }

    downloadFile = (uri, path) => { 
        RNFS.downloadFile({ fromUrl: uri, toFile: path }).promise
        .then(res => this.loadFile(path));
    }

    loadFile = (path) => {
        this.setState({ source: { uri: path } });
      }
  
    render() {
        return (
            <Image style={{ width: 100, height: 100 }} source={this.state.source} />
            //<Image style={this.props.style} source={this.state.source} />
        );
    }
}

export default CacheImage;

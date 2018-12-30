import React, { Component } from 'react';
import { Platform, ImageBackground } from 'react-native';
import LearnQuestionList from './LearnQuestionList';

class LearnBinnen extends Component {
//const Quest = (props) => {
    //render(props) {
    renderContent() {
        return (
            <LearnQuestionList fromID={73} toID={253} />
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

export default LearnBinnen;

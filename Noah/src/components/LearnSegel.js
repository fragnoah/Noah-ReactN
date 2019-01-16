import React, { Component } from 'react';
import { Platform, ImageBackground } from 'react-native';
import LearnQuestionList from './LearnQuestionList';
import { iosFix } from '../utils';
class LearnSegel extends Component {
//const Quest = (props) => {
    //render(props) {
    renderContent() {
        return (
            <LearnQuestionList fromID={254} toID={300} />
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

export default LearnSegel;

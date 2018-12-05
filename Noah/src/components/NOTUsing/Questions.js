import React, { Component } from 'react';
//import React from 'react';
import { ScrollView } from 'react-native';
import { ListItem } from '../common/MyListItem';

class Quest extends Component {
//const Quest = (props) => {
    //render(props) {
    render() {
        return (
            <ScrollView>
                
                <ListItem children="Antwort 1" />
                <ListItem children="Antwort 2" />
                <ListItem children="Antwort 3" />
            </ScrollView>
        );
    }
}

export default Quest;

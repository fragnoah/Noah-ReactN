import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { ListItem } from './common/MyListItem';

class LearnMenu extends Component {
    render() {
        return (
            <ScrollView>
                <ListItem children="Kapitel 1" />
                <ListItem children="Kapitel 2" />
                <ListItem children="Kapitel 3" />
            </ScrollView>
        );
    }
}

export default LearnMenu;

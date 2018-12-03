import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { ListItem } from './common/MyListItem';
import CardQuestion from './CardQuestion';

class LearnMenu extends Component {
    render() {
        const q = { quest: 'Test' };
        console.log(q); 
        return (
            <ScrollView>
                <ListItem children="Kapitel 1" />
                <ListItem children="Kapitel 2" />
                <ListItem children="Kapitel 3" />

                
                <CardQuestion question={q} />
            </ScrollView>
        );
    }
}

export default LearnMenu;

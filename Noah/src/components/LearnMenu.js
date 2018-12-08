import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { ListItem } from './common/MyListItem';
import * as actions from '../actions';

class LearnMenu extends Component {
    render() {
        const q = { quest: 'Test' };
        console.log(q); 
        return (
            <ScrollView>
                <ListItem children="Kapitel 1" onPress={actions.toLearnBasicQuestions} />
                <ListItem children="Kapitel 2" onPress={actions.toLearnBinnenQuestions} />
                <ListItem children="Kapitel 3" onPress={actions.toLearnSegelQuestions} />

            </ScrollView>
        );
    }
}

export default LearnMenu;

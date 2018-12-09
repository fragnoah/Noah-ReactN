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
                <ListItem children="Basisfragen" onPress={actions.toLearnBasicQuestions} />
                <ListItem children="Binnenfragen" onPress={actions.toLearnBinnenQuestions} />
                <ListItem children="Segelfragen" onPress={actions.toLearnSegelQuestions} />

            </ScrollView>
        );
    }
}

export default LearnMenu;

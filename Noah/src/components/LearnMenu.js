import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { ListItem } from './common/MyListItem';
import { 
    toLearnBasicQuestions, 
    toLearnBinnenQuestions, 
    toLearnSegelQuestions 
        } from '../actions';

class LearnMenu extends Component {
    render() {
        const q = { quest: 'Test' };
        console.log(q); 
        return (
            <ScrollView>
                <ListItem children="Kapitel 1" onPress={toLearnBasicQuestions} />
                <ListItem children="Kapitel 2" onPress={toLearnBinnenQuestions} />
                <ListItem children="Kapitel 3" onPress={toLearnSegelQuestions} />

            </ScrollView>
        );
    }
}


/*

*/
export default LearnMenu;

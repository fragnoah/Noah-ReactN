import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { ListItem } from './common/MyListItem';
<<<<<<< HEAD

class LearnMenu extends Component {
    render() {
        return (
            <ScrollView>
                <ListItem children="Kapitel 1" />
                <ListItem children="Kapitel 2" />
                <ListItem children="Kapitel 3" />
=======
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

>>>>>>> ddbf39451b640ee054f42f7cbf2fc3e34072a99e
            </ScrollView>
        );
    }
}

<<<<<<< HEAD
=======

/*

*/
>>>>>>> ddbf39451b640ee054f42f7cbf2fc3e34072a99e
export default LearnMenu;

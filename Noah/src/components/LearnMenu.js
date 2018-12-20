import React, { Component } from 'react';
import { ScrollView, SectionList, Text } from 'react-native';
import { ListItem } from './common/MyListItem';
import * as actions from '../actions';

class LearnMenu extends Component {

    render() {
        return (
            <ScrollView>
                <ListItem children="Basisfragen" onPress={actions.toLearnBasicQuestions} />
                <ListItem children="Binnenfragen" onPress={actions.toLearnBinnenQuestions} />
                <ListItem children="Segelfragen" onPress={actions.toLearnSegelQuestions} />
                <ListItem children="Glossar" onPress={actions.toGlossar} />
            </ScrollView>
        );
    }
}

export default LearnMenu;

import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { ListItem } from './common/MyListItem';
import { toQuestions } from '../actions';

class TestMenu extends Component {
    renderTest() {

    }

    render() {
        return (
            <ScrollView>
                <ListItem children="Test 1" onPress={toQuestions} />
                <ListItem children="Test 2" onPress={toQuestions} />
                <ListItem children="Test 3" onPress={toQuestions} />
        </ScrollView>
        );
    }
}

export default TestMenu;

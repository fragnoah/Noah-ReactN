import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListRadio } from './common/MyListItem';
import { addOrRemove } from '../utils/objectArray';


export default class TagsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected
        };
    }

    onPress = (tag) => {
        let selected;
        if (this.props.isExclusive) {
            selected = [tag];
        } else {
            selected = addOrRemove(this.state.selected, tag);
        }
        this.setState({
            selected 
        });
    }

    makeButtons() {
        return this.props.all.map((tag, i) => {
            const on = this.state.selected.includes(tag);
            const backgroundColor = on ? '4BFF00' : 'CDE1E8';
            //const textColor = on ? R.colors.on.text : R.colors.off.text;
            //const borderColor = on ? R.colors.on.border : R.colors.off.border;

            return (
                <ListRadio
                    backgroundColor={backgroundColor}
                    //textColor={textColor}
                    //borderColor={borderColor}
                    onPress={() => {
                        this.onPress(tag);
                    }}
                    key={i}
                    title={tag} 
                />
            );
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.makeButtons()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20
  }
});

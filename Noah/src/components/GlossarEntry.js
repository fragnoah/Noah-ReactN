import React, { Component } from 'react';
import {
  Text,
  FlatList,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation,
  } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';
import GlossarItem from './GlossarItem';
// import CacheImage from './CacheImage';

class GlossarEntry extends Component {

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderItem(item) {
    console.log('Item rendern', item);
    return <GlossarItem item={item.item} />;
    //return <GlossarSection glossar={glossar.item} />;
  }
    
  render() {
    console.log('Entryprops ', this.props);
    return (
      <FlatList 
          data={this.props.entry}
          renderItem={this.renderItem}
          keyExtractor={(entry) => entry.title}
      />
    ); 
  } 
/*
    const { title } = this.props.entry;

    console.log('ENTRY', this.props.entry);
    return (
      <TouchableWithoutFeedback
      onPress={() => this.props.selectGlossaryTitle(title)}
      >
        <View>
          <CardSection>
            <Text>{title}</Text>
          </CardSection>
          {this.renderSection()}
        </View>
    </TouchableWithoutFeedback>
      );
  }
*/
}

const styles = {
  descriptionStyle: {
    paddingLeft: 15,
    paddingRight: 5,
    flex: 1
  }, 
  boldText: {
    fontWeight: 'bold'
  }
};

/*
const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedGlossarTitle === ownProps.glossar.key;
  //return { selectedGlossarTitle: state.selectedGlossarTitle };
  return { expanded };
};
*/
const mapStateToProps = state => {
  //const expanded = state.selectedGlossarTitle === ownProps.glossar.key;
  //return { selectedGlossarTitle: state.selectedGlossarTitle };
  //return { expanded };
};

export default connect(null, actions)(GlossarEntry);
//export default connect(mapStateToProps, actions)(GlossarEntry);

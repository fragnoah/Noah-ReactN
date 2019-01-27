import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo';
import AppIntroSlider from 'react-native-app-intro-slider';

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
});

const slides = [
  {
    key: 'slider',
    title: 'Fragen merken',
    text:
      'Im Prüfungsmodus Fragen markieren und später noch einmal wiederholen',
    icon: 'pin.png',
    colors: ['#63E2FF', '#B066FE'],
  },
  {
    key: 'slider1',
    title: 'Merkhilfen anzeigen',
    text:
      'Antworten miteinander vergleichen und richtige Antwort merken',
    icon: 'highlight.png',
    colors: ['#A3A1FF', '#3A3897'],
  },
  {
    key: 'slider2',
    title: 'Knoten üben',
    text: 'Videos ansehen und gut vorbereitet sein',
    icon: 'play.png',
    colors: ['#29ABE2', '#4F00BC'],
  },
];

export default class App extends React.Component {
  _renderItem = props => (
    <LinearGradient
      style={[
        styles.mainContent,
        {
          paddingTop: props.topSpacer,
          paddingBottom: props.bottomSpacer,
          width: props.width,
          height: props.height,
        },
      ]}
      colors={props.colors}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}
    >
      <Ionicons
        style={{ backgroundColor: 'transparent' }}
        name={props.icon}
        size={200}
        color="white"
      />
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </LinearGradient>
  );

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        bottomButton
        showPrevButton
        showSkipButton
        // hideNextButton
        // hideDoneButton
        // onSkip={() => console.log("skipped")}
      />
    );
  }
}

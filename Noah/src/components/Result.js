import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ProgressCircle, BarChart, Grid, XAxis } from 'react-native-svg-charts';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import * as scale from 'd3-scale';
import { Card, ButtonWithImage } from './common';
import * as actions from '../actions';


class Result extends Component {
    checkScore() {
         this.Ergebnis = 'leider nicht bestanden';
        if (this.props.quiz.basisScore >= 5 && this.props.quiz.spezScore >= 18) {
            this.Ergebnis = 'Glückwünsch,bestanden';
            if (this.props.quiz.passedFb.includes(this.props.quiz.fragebogen) === false) {
                this.props.passFb(this.props.quiz.fragebogen);
            }
        }
    }
    wrongRepeate() {
        if (this.props.quiz.wrongAns.length > 0) {
        this.props.resetWrongAnswer();
        actions.toRepeatWrong();
        } else {
            showMessage({
                message: 'Hinweis',
                description: 'Keine falschen Fragen mehr vorhanden',
                type: 'info',
                icon: 'info'
            });
        }
    }
    marked() {
        this.props.resetMarked();
        if (this.props.quiz.marked.length > 0) {
            actions.toRepeatMarked();
            } else {
                showMessage({
                    message: 'Hinweis',
                    description: 'Kein Frage markiert',
                    type: 'info',
                    icon: 'info'
                });
            }
        }
    all() {
        this.props.resetMarked();
        actions.toRepeatAll();
    }
    render() {
        const { 
            cardStyle,
            cardTitle,             
            smallButtonStyle,
            bigButtonStyle,
            imageStyle,
           // noImageStyle
        } = styles;
        const progess = this.props.quiz.passedFb.length / 15;
        const rest = 15 - this.props.quiz.passedFb.length;
        const data = [
            {
                value: this.props.quiz.passedFb.length,
                label: 'Bestandene Fragebögen',
                svg: {
                    fill: 'rgb(50,205,50)',
                },
            },
            {
                value: rest,
                label: 'Noch zu bestehen',
                svg: {
                    fill: 'rgb(255,0,0)',
                },
            },
        ];
        
        this.checkScore();
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <Card cardStyle={cardStyle}>
                        <Text style={cardTitle}>Ergebnis </Text>
                        <Text>Basispunkte: {this.props.quiz.basisScore} von 7 </Text>
                        <Text>Spezpunkte: {this.props.quiz.spezScore} von 23 </Text>
                        <Text>{this.Ergebnis}</Text>
                    </Card>

                    <Card cardStyle={cardStyle}>
                        <Text style={cardTitle}>Statistik</Text>
                        <View style={{ height: 200 }}>
                            <BarChart
                                style={{ flex: 1 }}
                                data={data}
                                yAccessor={({ item }) => item.value}
                                gridMin={0}
                                svg={{ fill: 'rgb(134, 65, 244)' }}
                            />
                            <XAxis
                                style={{ marginTop: 10 }}
                                data={data}
                                scale={scale.scaleBand}
                                formatLabel={(_, index) => data[index].label}
                            />
                        </View>
                        <ProgressCircle
                            style={{ height: 100, backgroundColor: 'transparent' }}
                            progress={progess}
                            progressColor={'rgb(50,205,50)'}
                            startAngle={-Math.PI * 0.8}
                            endAngle={Math.PI * 0.8}
                        />
                    </Card>

                    <Card cardStyle={cardStyle}>
                        <Text style={cardTitle}>Test analysieren</Text>
                        <ButtonWithImage
                            buttonText="Falsche Fragen" 
                            onPress={() => this.wrongRepeate()}
                            buttonStyle={bigButtonStyle} 
                            imageStyle={imageStyle}
                            imgLeft={require('../assets/img/wrong.png')}
                        />
                        <ButtonWithImage
                            buttonText="Makierte Fragen" 
                            onPress={() => this.marked()} 
                            buttonStyle={smallButtonStyle} 
                            imageStyle={imageStyle}
                            imgLeft={require('../assets/img/flag.png')}
                        />
                        <ButtonWithImage
                        buttonText="alle Fragen" 
                        onPress={() => this.all()} 
                        buttonStyle={smallButtonStyle} 
                        imageStyle={imageStyle}
                        imgLeft={require('../assets/img/repeat.png')}
                        />

                    </Card>
               
                
                <View>
                    <Card cardStyle={cardStyle}>
                        <Text style={cardTitle}>weiter </Text>
                        <ButtonWithImage
                            buttonText="zu den Fragebögen" 
                            onPress={actions.toTests}
                            buttonStyle={bigButtonStyle} 
                            imageStyle={imageStyle}
                            imgLeft={require('../assets/img/test.png')}
                        />
                        <ButtonWithImage
                            buttonText="zum Hauptmenü" 
                            onPress={actions.toMain} 
                            buttonStyle={smallButtonStyle} 
                            imageStyle={imageStyle}
                            imgLeft={require('../assets/img/home.png')}
                        />
                    </Card>                 
                </View>

                </ScrollView>
                <FlashMessage ref="myLocalFlashMessage" />
            </View>
        );
    }
}

const styles = {
    cardStyle: {
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'rgba(255,255,255, 0.3)',
    },
    cardTitle: {
        fontSize: 20,
        opacity: 1
    },
    smallButtonStyle: {
        padding: 0,
        marginLeft: 20,
        marginRight: 2,
        opacity: 1,
        marginTop: 5
    },
    bigButtonStyle: {
        padding: 0,
        marginLeft: 20,
        marginRight: 2,
        opacity: 1,
    },
    imageStyle: {
        height: 40,
        width: 40
    },
    noImageStyle: {
        height: 0,
        width: 40
    }
};

const mapStateToProbs = state => {
    return { quiz: state.selectedFb };
};

export default connect(mapStateToProbs, actions)(Result);

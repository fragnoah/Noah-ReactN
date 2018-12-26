import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ProgressCircle, BarChart, Grid, XAxis } from 'react-native-svg-charts';
import * as actions from '../actions';
import * as scale from 'd3-scale';
import FlashMessage, { showMessage } from 'react-native-flash-message';

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
        Actions.repeat();
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
            Actions.mark();
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
        Actions.all();
    }
    back() {
        this.props.resetFb();
        Actions.test();
    }
    render() {
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
            <View style={{ flexDirection: 'column' }}>
                <Text>Ergebnis </Text>
                <Text>Basispunkte: {this.props.quiz.basisScore} von 7 </Text>
                <Text>Spezpunkte: {this.props.quiz.spezScore} von 23 </Text>
                <Text>{this.Ergebnis}</Text>

                <Button
                onPress={() => this.back()}
                title="Zurück zum Start-Menü"
                color='#ff00ff00'
                />

                <Button
                onPress={() => this.wrongRepeate()}
                title="Falsche Fragen wiederholen"
                color='#ff00ff00'
                />
                <Button
                onPress={() => this.marked()}
                title="Makierte Fragen wiederholen"
                color='#ff00ff00'
                />
                <Button
                onPress={() => this.all()}
                title="Alle Fragen wiederholen"
                color='#ff00ff00'
                />
                <View style={{ height: 200, padding: 20 }}>
                    <BarChart
                        style={{ flex: 1 }}
                        data={data}
                        yAccessor={({ item }) => item.value}
                        gridMin={0}
                        svg={{ fill: 'rgb(134, 65, 244)' }}
                    />
                    <XAxis
                        style={{ marginTop: 10 }}
                        data={ data }
                        scale={scale.scaleBand}
                        formatLabel={(_, index) => data[ index ].label}
                    />
                </View>
                <ProgressCircle
                    style={{ height: 100, backgroundColor: 'black' }}
                    progress={progess}
                    progressColor={'rgb(50,205,50)'}
                    startAngle={-Math.PI * 0.8}
                    endAngle={Math.PI * 0.8}
                />
                <FlashMessage 
                    ref="myLocalFlashMessage"  
                />       
            </View>
        );
    }
}

const mapStateToProbs = state => {
    return { quiz: state.selectedFb };
};

export default connect(mapStateToProbs, actions)(Result);

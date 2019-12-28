import React from 'react'
import { Platform, StyleSheet, View, Text, Image } from 'react-native'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'
import { getImageByDisappointment } from '../helpers/problem';
import Typography from '../styles/typography';

import Human from '../assets/images/human-icon.png';


export default function Chart (props) {
    const { answers } = props;
    const totlaLength = answers ? answers.length : 0;
    let positive = 0;

    if (!!answers) {
        answers.forEach(a => {
            if (!a.isProblem) {
                positive++;
            }
        })
    }

    const progress = totlaLength > 0 ? (positive * 100) / totlaLength : 0;
    const color = progress > 50 ? '#FE5B61' : '#4DA5FF';

    return (
        <View style={[styles.wrap, props.style]}>
            <Text style={[Typography.p ,styles.text]}>Hardness based on <Text style={{ color: '#A0A4A8' }}>{answers ? answers.length : 0} reviews</Text></Text>
            <View style={styles.chartWrap}>
                <View style={styles.bg} />
                <View style={[styles.progress, { width: `${progress}%`, backgroundColor: color }]} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        width: '100%',
    },
    text: {
        marginBottom: 8,
    },
    chartWrap: {
        width: '100%',
        borderRadius: 4,
        height: 8,
    },
    bg: {
        backgroundColor: '#99CBFF',
        opacity: 0.2,
        position: 'absolute',
        flex: 1,
        height: '100%',
        width: '100%',
        borderRadius: 4,
    },
    progress: {
        borderRadius: 4,
        height: 8,
    }
})

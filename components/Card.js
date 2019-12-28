import React from 'react'
import { Platform, StyleSheet, View, Text, Image } from 'react-native'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'
import { getImageByDisappointment } from '../helpers/problem';
import Typography from '../styles/typography';

import Human from '../assets/images/human-icon.png';

const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49 // found from https://stackoverflow.com/a/50318831/6141587

export const Card = ({ title, description, disappointment }) => (
    <View style={styles.card}>
        <Image source={getImageByDisappointment(disappointment)} style={styles.image} />
        <View style={styles.postTime}>
            <Image source={Human} style={styles.human} />
            <Text style={Typography.pSmall}>posted few hours ago</Text>
        </View>
        <Text style={[Typography.h2, styles.heading]}>{title}</Text>
        <Text style={[Typography.p]}>{description}</Text>
    </View>
)

const styles = StyleSheet.create({
    card: {
        width: Layout.window.width * 0.83,
        borderRadius: 7,
        backgroundColor: Colors.white,
        height: Layout.window.height * 0.6,
        padding: 32,
    },
    image: {
        height: 175,
        width: 237,
        marginBottom: 40,
        alignSelf: 'center',
    },
    heading: {
        marginBottom: 16,
    },
    human: {
        marginRight: 12,
        height: 22,
        width: 17,
    },
    postTime: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
})

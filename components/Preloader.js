import React from 'react'
import { Platform, StyleSheet, View, Text, Image } from 'react-native'
import Layout from '../constants/Layout'

import preloaderImage from '../assets/images/preloader.png';

const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49 // found from https://stackoverflow.com/a/50318831/6141587

export default () => (
    <View style={styles.container}>
        <View style={styles.layer} />
        <Image source={preloaderImage} style={styles.preloaderImage} />
        {/* <Text>Loading...</Text> */}
    </View>
)

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1000,
        height: Layout.window.height,
        width: Layout.window.width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(203, 178, 245, 0.5)',
    },
    layer: {
        height: Layout.window.height,
        width: Layout.window.width,
        backgroundColor: '#98A3F9',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    preloaderImage: {
        width: 157,
        height: 156,
    },
})

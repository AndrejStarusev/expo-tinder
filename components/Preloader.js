import React from 'react'
import { Platform, StyleSheet, View, Text } from 'react-native'
import Layout from '../constants/Layout'

const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49 // found from https://stackoverflow.com/a/50318831/6141587

export default () => (
    <View style={styles.container}>
        <View style={styles.layer} />
        <Text>Loading...</Text>
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
        backgroundColor: 'transparent',
    },
    layer: {
        height: Layout.window.height,
        width: Layout.window.width,
        backgroundColor: '#98A3F9',
        position: 'absolute',
        top: 0,
        left: 0,
    },
})

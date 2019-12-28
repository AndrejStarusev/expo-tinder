import React from 'react'
import { Platform, StyleSheet, View, Text } from 'react-native'
import Layout from '../constants/Layout'

const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49 // found from https://stackoverflow.com/a/50318831/6141587

export default (props) => (
    <View style={[styles.container, props.style]}>
        {props.children}
    </View>
)

const styles = StyleSheet.create({
    container: {
        width: Layout.window.width,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        paddingHorizontal: 32, 
    },
})

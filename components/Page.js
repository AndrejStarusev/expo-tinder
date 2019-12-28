import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors';

export default (props) => (
    <SafeAreaView style={[styles.page, props.style]}>
        {props.children}
    </SafeAreaView>
)

const styles = StyleSheet.create({
    page: {
        width: Layout.window.width,
        backgroundColor: Colors.grayBG,
        flex: 1,
    },
})

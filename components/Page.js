import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors';

export default (props) => (
    <View style={[styles.page, props.style]}>
        {props.children}
    </View>
)

const styles = StyleSheet.create({
    page: {
        width: Layout.window.width,
        backgroundColor: Colors.grayBG,
        flex: 1,
    },
})

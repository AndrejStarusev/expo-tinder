import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'

export default class Profile extends React.Component {

    render() {
        const { err } = this.state;
        return (
            <SafeAreaView>
                <Text>Problem page</Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({});
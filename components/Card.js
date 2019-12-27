import React from 'react'
import { Platform, StyleSheet, View, Text } from 'react-native'
import Layout from '../constants/Layout'

const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49 // found from https://stackoverflow.com/a/50318831/6141587

export const Card = ({ pic, title, description }) => (
  <View style={styles.card}>
    <Text>{title}</Text>
    <Text>{description}</Text>
  </View>
)

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: 'gray',
    height: Layout.window.height * 0.65,
  },
})

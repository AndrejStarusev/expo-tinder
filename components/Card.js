import React from 'react'
import { Platform, StyleSheet, View, Text } from 'react-native'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49 // found from https://stackoverflow.com/a/50318831/6141587

export const Card = ({ title, description, disappointment }) => (
  <View style={styles.card}>
    {/* <Image source={avatarPlaceholder} style={styles.avatar} /> */}
    <Text>{title}</Text>
    <Text>{description}</Text>
  </View>
)

const styles = StyleSheet.create({
  card: {
    width: Layout.window.width * 0.83,
    borderRadius: 7,
    backgroundColor: Colors.white,
    height: Layout.window.height * 0.65,
    borderWidth: 1,
    borderColor: Colors.borderGray,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 7,  
    elevation: 5
  },
})

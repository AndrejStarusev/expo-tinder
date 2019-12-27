import React from 'react'
import { SafeAreaView, StyleSheet, View, Image, Button } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { Card } from '../components/Card'
import { HomeScreenPics } from '../constants/Pics'
import avatarPlaceholder from '../assets/images/avatar.png';

class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.headerNav}>
            <View style={styles.avatarWrap}>
                <Image source={ avatarPlaceholder } style={styles.avatar} />
            </View>
            <View style={styles.buttonWrap}>
              <Button
                title=''
              >
                <Image source={ avatarPlaceholder } style={styles.avatar} />
              </Button>
            </View>
          </View>
          <View style={styles.swiperWrap}>
            <Swiper
              cards={HomeScreenPics}
              renderCard={Card}
              infinite
              backgroundColor="white"
              cardHorizontalMargin={0}
              stackSize={1}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1,
  },
  headerNav: {
    width: '100%',
    marginBottom: 36,
    borderColor: 'green',
    borderWidth: 1,
  },
  avatarWrap: {
    height: 61,
    width: 61,
  },
  avatar:{
    width: 61,
    height: 61,
    display: 'flex',
  },
  swiperWrap: {
    position: 'relative',
    top: 0,
    width: '100%',
    flex: 1,
    alignItems: 'flex-start',
    borderColor: 'red',
    borderWidth: 1,
  }
})

export default HomeScreen

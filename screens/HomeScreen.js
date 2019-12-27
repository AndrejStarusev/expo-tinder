import React from 'react'
import { SafeAreaView, StyleSheet, View, Image, Button, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { Card } from '../components/Card'
// import { HomeScreenPics } from '../constants/Pics'
import avatarPlaceholder from '../assets/images/avatar.png';
import Storage, { Frustrations } from '../firebase';

class HomeScreen extends React.Component {
  state = {
    cards: [],
  }

  async componentDidMount() {
    const problems = await Storage.getProblems();

    if (problems) {
      this.setState({ cards: problems });
    }
  }

  render() {
    const { cards } = this.state;

    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.headerNav}>
            <TouchableOpacity style={styles.avatarWrap} onPress={() => this.props.navigation.navigate('Profile')}>
                <Image source={ avatarPlaceholder } style={styles.avatar} />
            </TouchableOpacity>
            <View style={styles.buttonWrap}>
              {/* <Button
                style={styles.buttonAdd}
              >
                <Image source={ avatarPlaceholder } style={styles.avatar} />
              </Button> */}
            </View>
          </View>
          <View style={styles.swiperWrap}>
            {
              !!cards && (
                <Swiper
                  cards={cards}
                  renderCard={Card}
                  infinite
                  backgroundColor="white"
                  cardHorizontalMargin={0}
                  stackSize={1}
                  containerStyle={{ paddingTop: 0 }}
                  cardStyle={{ paddingTop: 0 }}
                  cardVerticalMargin={0}
                  cardHorizontalMargin={0}
                />
              )
            }
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
    // paddingLeft: 30,
    // paddingRight: 30,
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
  buttonAdd: {
    backgroundColor: '#DBF6FF',
  },
  swiperWrap: {
    position: 'relative',
    width: '100%',
    flex: 1,
    alignItems: 'flex-start',
    borderColor: 'red',
    borderWidth: 1,
  }
})

export default HomeScreen

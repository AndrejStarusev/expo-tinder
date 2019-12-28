import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { Button, Text } from 'react-native-elements'
import { Card } from '../components/Card'
import Storage, { Frustrations } from '../firebase';
import Container from '../components/Container';
import Page from '../components/Page';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout'

import avatarPlaceholder from '../assets/images/avatar.png';
import LOGO from '../assets/images/logo-gray.png';
import Plus from '../assets/images/plus-purple.png';

class HomeScreen extends React.Component {
    state = {
        cards: [],
    }

    async componentDidMount() {
        const problems = await Storage.getProblems();

        console.log('___problems', problems);

        if (problems) {
            this.setState({ cards: problems });
        }
    }

    afterSwipe = async (index, isProblem) => {
        const { cards } = this.state;
        const problem = cards[index];
        console.log('afterSwipe', index, isProblem);

        try {
            await Storage.addAnswer({ isProblem, problemID: problem.id });
        } catch (err) {
            console.log('err', err.message);
        }
    }

    render() {
        const { cards } = this.state;

        return (
            <Page style={styles.mainContainer}>
                <Container style={styles.container}>
                    <View style={styles.headerNav}>
                        <TouchableOpacity style={styles.avatarWrap} onPress={() => this.props.navigation.navigate('Profile')}>
                            <Image source={avatarPlaceholder} style={styles.avatar} />
                        </TouchableOpacity>

                        <Image source={LOGO} style={styles.logo} />

                        <View style={styles.plusWrap}>
                            <Image source={Plus} style={styles.plus} />
                        </View>
                    </View>
                    <View style={styles.swiperWrap}>
                        {
                            !!cards && (
                                <Swiper
                                    cards={cards}
                                    renderCard={Card}
                                    infinite
                                    backgroundColor="transparent"
                                    cardHorizontalMargin={0}
                                    stackSize={1}
                                    containerStyle={{ paddingTop: 0, height: Layout.window.height * 0.65 }}
                                    cardVerticalMargin={0}
                                    cardHorizontalMargin={0}
                                    onSwipedLeft={i => this.afterSwipe(i, false)}
                                    onSwipedRight={i => this.afterSwipe(i, true)}
                                />
                            )
                        }
                    </View>
                    <View>
                        <Button>OK</Button>
                        <Button>NE-OK</Button>
                    </View>
                </Container>
            </Page>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    headerNav: {
        width: '100%',
        marginBottom: 36,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    avatarWrap: {
        height: 43,
        width: 43,
    },
    avatar: {
        width: 43,
        height: 43,
        display: 'flex',
    },
    logo: {
        width: 101,
        height: 23,
    },
    plusWrap: {
        height: 44,
        width: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 44 / 2,
    },
    plus: {
        width: 16,
        height: 16,
    },
    buttonAdd: {
        backgroundColor: '#DBF6FF',
    },
    swiperWrap: {
        flex: 1,
        position: 'relative',
        width: '100%',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
    }
})

export default HomeScreen

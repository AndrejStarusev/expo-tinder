import React from 'react'
import { StyleSheet, View, Image, Button, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { Card } from '../components/Card'
import Storage, { Frustrations } from '../firebase';
import Container from '../components/Container';
import Page from '../components/Page';
import Colors from '../constants/Colors';

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
                                    backgroundColor="white"
                                    cardHorizontalMargin={0}
                                    stackSize={1}
                                    containerStyle={{ paddingTop: 0 }}
                                    cardStyle={{ paddingTop: 0 }}
                                    cardVerticalMargin={0}
                                    cardHorizontalMargin={0}
                                    onSwipedLeft={i => this.afterSwipe(i, false)}
                                    onSwipedRight={i => this.afterSwipe(i, true)}
                                />
                            )
                        }
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
        borderColor: 'green',
        borderWidth: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    avatarWrap: {
        height: 61,
        width: 61,
    },
    avatar: {
        width: 61,
        height: 61,
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
        position: 'relative',
        width: '100%',
        flex: 1,
        alignItems: 'flex-start',
        borderColor: 'red',
        borderWidth: 1,
    }
})

export default HomeScreen

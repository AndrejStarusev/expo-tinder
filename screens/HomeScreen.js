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
import LOGO from '../assets/images/logo-black.png';
import Plus from '../assets/images/plus-purple.png';
import Arrow from '../assets/images/left-arrow.png';
import UP from '../assets/images/thumbs-up.png';
import DOWN from '../assets/images/thumbs-down.png';
import { observer } from 'mobx-react'

@observer
class HomeScreen extends React.Component {
    afterSwipe = async (index, isProblem) => {
        const cards = Storage.problems;
        const problem = cards[index];
        console.log('afterSwipe', index, isProblem);

        try {
            await Storage.addAnswer({ isProblem, problemID: problem.id });
        } catch (err) {
            console.log('err', err.message);
        }
    }

    render() {

        return (
            <Page style={styles.mainContainer} withBg>
                <Container style={styles.container}>
                    <View style={styles.headerNav}>
                        <TouchableOpacity style={styles.avatarWrap} onPress={() => this.props.navigation.navigate('Profile')}>
                            <Image source={avatarPlaceholder} style={styles.avatar} />
                        </TouchableOpacity>

                        <Image source={LOGO} style={styles.logo} />

                        <TouchableOpacity style={styles.plusWrap} onPress={() => this.props.navigation.navigate('Problem')}>
                            <Image source={Plus} style={styles.plus} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.swiperWrap}>
                        {
                            !!Storage.problems && (
                                <Swiper
                                    cards={Storage.problems}
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
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.btn}>
                            <Image source={DOWN} style={styles.btnImg} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btn}>
                            <Image source={UP} style={styles.btnImg} />
                        </TouchableOpacity>
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
        marginTop: 49,
        marginBottom: 36,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    avatarWrap: {
        height: 43,
        width: 43,
        // backgroundColor: Colors.white,
        borderRadius: 43 / 2,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    buttons: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: 241,
        justifyContent: 'space-between',
        marginBottom: 48,
    },
    btn: {
        height: 87,
        width: 87,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 87 / 2,
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: { width: 2, height: 2 },
        borderWidth: 1,
        borderColor: Colors.borderGray,
    },
    btnImg: {
        height: 37,
        width: 37,
    },
})

export default HomeScreen

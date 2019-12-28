import React from 'react'
import { ScrollView, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import avatarPlaceholder from '../assets/images/avatar.png';
import Instance from '../firebase';
import Colors from '../constants/Colors';
import Page from '../components/Page';
import Container from '../components/Container';
import CommonStyles from '../styles/common';
import Typography from '../styles/typography';
import { getImageByDisappointment } from '../helpers/problem';
import CartBlock from '../components/CartBlock';
import Storage from '../firebase';

import backIcon from '../assets/images/back.png';
import LOGO from '../assets/images/logo-black.png';
import Plus from '../assets/images/plus-purple.png';

export default class Profile extends React.Component {

    state = {
        problems: [],
    }

    async componentDidMount() {
        const problems = await Instance.getProblems(Instance.uid);
        if ( problems ) {
            this.setState({problems});
        }
    }
   
    render() {
        return (
            <Page style={styles.mainContainer} withNotch>
                <Container >
                    <View style={styles.headerNav}>
                        <TouchableOpacity style={styles.btnBack} onPress={() => this.props.navigation.navigate('Home')}>
                            <Image source={backIcon} style={styles.backIcon} />
                        </TouchableOpacity>

                        <Image source={LOGO} style={styles.logo} />

                        <TouchableOpacity style={styles.plusWrap} onPress={() => this.props.navigation.navigate('Problem')}>
                            <Image source={Plus} style={styles.plus} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.top}>
                        <Image source={avatarPlaceholder} style={styles.avatar} />
                        <Text style={styles.name}>Tiana Rosser</Text>
                        <Text style={[styles.desc, styles.descText]}>
                            Must go faster. Must go faster... go, go, go, go, go! I was part of something special.
                        </Text>
                        <View style={styles.separator} />
                        <View style={{ flexDirection: 'row', width: 194, justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.textNumber}>321K</Text>
                                <Text style={[styles.descText]}>Problems</Text>
                            </View>
                            <View>
                                <Text style={styles.textNumber}>298</Text>
                                <Text style={[styles.descText]}>Answers</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={[Typography.h2, { marginTop: 40 }]}>Shared Problems</Text>
                </Container>
                <Container style={{ flex: 1}}>
                    <ScrollView style={styles.problems}>
                        {
                            this.state.problems.map((problem, i) => {
                                return (
                                    <TouchableOpacity
                                        key={i}
                                        style={styles.cardProblem}
                                        onPress={() => this.props.navigation.navigate(
                                            'ViewProblem',
                                            { id: problem.id }
                                        )}
                                    >   
                                        <View style={styles.imgWrap}>
                                            <Image source={getImageByDisappointment(problem && problem.disappointment)} style={styles.image} />
                                        </View>
                                        <View style={{ justifyContent: 'space-between', paddingVertical: 4, width: '100%' }}>
                                            <Text style={styles.cardTitle}>{problem && problem.title}</Text>
                                            <CartBlock answers={Storage.getAnswersByProblem(problem.id)} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </Container>
            </Page>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    profileWrap: {
        backgroundColor: Colors.bgProfile,
    },
    container: {
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
    },
    headerNav: {
        width: '100%',
        marginTop: 49,
        marginBottom: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    btnBack: {
        height: 44,
        width: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 44 / 2,
    },
    backIcon: {
        width: 24,
        height: 24,
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
    profileBlock: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarWrap: {
        height: 121,
        width: 121,
        alignItems: 'center',
        marginBottom: 40, 
    },
    card: {
        backgroundColor: 'gray',
    },
    top: {
        width: '100%',
        ...CommonStyles.shadow,
        borderRadius: 8,
        backgroundColor: Colors.white,
        paddingHorizontal: 18,
        paddingVertical: 16,
        alignItems: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(228, 228, 228, 0.6)',
        width: '90%',
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 60 / 2,
        marginBottom: 24,
    },
    desc: {
        marginTop: 4,
        marginBottom: 24,
    },
    descText: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 13,
        lineHeight: 18,
        color: '#666666',
        textAlign: 'center',
    },
    textNumber: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 17,
        lineHeight: 22,
        color: '#151522',
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 16,
    },
    name: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 20,
        lineHeight: 25,
        color: '#151522',
        textAlign: 'center',
        fontWeight: '600',
    },
    imgWrap: {
        height: 85,
        width: 85,
        ...CommonStyles.shadow,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderWidth: 1,
        borderColor: 'rgba(228, 228, 228, 0.6)',
        backgroundColor: Colors.white,
        borderRadius: 4,
    },
    image: {
        height: 55,
        width: 75,
    },
    cardProblem: {
        flexDirection: 'row',
        borderBottomColor: 'rgba(228, 228, 228, 0.6)',
        borderBottomWidth: 1,
        paddingVertical: 16,
    },
    cardTitle: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15,
        lineHeight: 20,
        color: '#000000',
        textAlign: 'left',
    },
    problems: {
        flex: 1,
        // minHeight: 300,
        marginTop: 10,
    },
});
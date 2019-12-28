import React from 'react'
import { SafeAreaView, StyleSheet, Button, View, TouchableOpacity, Image } from 'react-native'
import { Text, Input } from 'react-native-elements'
import Page from '../components/Page';
import Storage, { Frustrations } from '../firebase';
import { getImageByDisappointment } from '../helpers/problem';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Typography from '../styles/typography';

import backIcon from '../assets/images/back.png';
import bgMain from '../assets/images/bg-main.png';
import LOGO from '../assets/images/logo-gray.png';
import Plus from '../assets/images/plus-purple.png';

export default class ViewProblem extends React.Component {

    state = {
        problem: null,
        answers: [],
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('id');

        if (id) {
            const problem = await Storage.getProblemById(id);
            const answers = await Storage.getAnswersByProblem(id);
            console.log('answers', answers);
            this.setState({ problem, answers });
        }
    }

    render() {
        const { problem, answers } = this.state;

        return (
            <Page style={styles.mainContainer} withBg>
                <View style={styles.problemWrap}>
                    <View style={styles.container}>
                        <View style={styles.headerNav}>
                            <TouchableOpacity style={styles.btnBack} onPress={() => this.props.navigation.goBack()}>
                                <Image source={backIcon} style={styles.backIcon} />
                            </TouchableOpacity>

                            <Image source={LOGO} style={styles.logo} />

                            <View style={styles.plusWrap}>
                                <Image source={Plus} style={styles.plus} />
                            </View>
                        </View>
                        <View style={styles.problemBlock}>
                            {problem && <Image source={getImageByDisappointment(problem.disappointment)} style={styles.image} />}
                            <Text style={[Typography.h2, styles.heading]}>{problem && problem.title}</Text>
                            <Text style={[Typography.p]}>{problem && problem.description}</Text>
                        </View>
                    </View>
                </View>
            </Page>
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
        width: 14,
        height: 14,
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
    problemBlock: {
        width: Layout.window.width * 0.83,
        borderRadius: 7,
        backgroundColor: Colors.white,
        height: Layout.window.height * 0.76,
        borderWidth: 1,
        borderColor: Colors.borderGray,
        shadowColor: 'rgba(50, 50, 71, 0.08)',
        shadowOffset: { width: 20, height: 10 },
        shadowRadius: 7,
        elevation: 5,
        padding: 32,
        zIndex: 2,
    },
    image: {
        height: 175,
        width: 237,
        marginBottom: 43,
        alignSelf: 'center',
    },
    heading: {
        marginBottom: 16,
        color: Colors.blackText,
    },
});
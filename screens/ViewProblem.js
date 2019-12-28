import React from 'react'
import { SafeAreaView, StyleSheet, Button, View, TouchableOpacity, Image } from 'react-native'
import { Text, Input } from 'react-native-elements'
import Storage, { Frustrations } from '../firebase';
import { getImageByDisappointment } from '../helpers/problem';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Typography from '../styles/typography';

import backIcon from '../assets/images/back.png';
import LOGO from '../assets/images/logo-gray.png';
import Plus from '../assets/images/plus-purple.png';
import Human from '../assets/images/human-icon.png';

export default class Problem extends React.Component {

    state = {
        problem: null,
        answers: [],
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('id');

        logger.log(id);

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
            <View style={styles.mainContainer}>
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
                            {/* <Image source={getImageByDisappointment(problem.disappointment)} style={styles.image} /> */}
                            <Text style={[Typography.h2, styles.heading]}>{problem && problem.title}</Text>
                            <Text style={[Typography.p]}>{problem && problem.description}</Text>
                        </View>
                    </View>
                </View>
            </View>
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
        marginTop: 68,
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
    problemBlock: {
        width: Layout.window.width * 0.83,
        borderRadius: 7,
        backgroundColor: Colors.white,
        height: Layout.window.height * 0.65,
        borderWidth: 1,
        borderColor: Colors.borderGray,
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 7,
        elevation: 5,
        padding: 32,
    },
    image: {
        height: 106,
        width: 137,
        marginBottom: 40,
        alignSelf: 'center',
    },
    heading: {
        marginBottom: 16,
    },
    human: {
        marginRight: 12,
        height: 22,
        width: 17,
    },
    postTime: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
});
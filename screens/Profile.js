import React from 'react'
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import avatarPlaceholder from '../assets/images/avatar.png';
import Instance from '../firebase';
import Colors from '../constants/Colors';

import backIcon from '../assets/images/back.png';
import LOGO from '../assets/images/logo-gray.png';
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
            <View style={styles.mainContainer}>
                <View style={styles.profileWrap}>
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
                        <View style={styles.profileBlock}>
                            <View style={styles.avatarWrap}>
                                <Image source={ avatarPlaceholder } style={styles.avatar} />
                            </View>
                            <View style={styles.statsWrap}>
                                <View style={styles.statCard}>
                                    <Text style={styles.StatLableTitle}>{this.state.problems.length}</Text>
                                    <Text style={styles.StatLableDesc}>Problems</Text>
                                </View>    
                                <View style={styles.statCard}>
                                    <Text style={styles.StatLableTitle}>0</Text>
                                    <Text style={styles.StatLableDesc}>Answers</Text>
                                </View>    
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.problemsWrap}>
                    <View style={styles.container}>
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
                                        <Text style={styles.cardProblemTitle}>{problem.title}</Text>
                                        <Text style={styles.cardProblemDesc}>{problem.description}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
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
    avatar:{
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    card: {
        backgroundColor: 'gray',
    },
});
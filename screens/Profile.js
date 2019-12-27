import React from 'react'
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import avatarPlaceholder from '../assets/images/avatar.png';
import Instance from '../firebase';

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
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.headerNav}>
                        <Button
                            style={styles.btnBack}
                            title="Back"
                            onPress={this.props.navigation.goBack}
                        />
                    </View>
                    <View style={styles.profileWrap}>
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
                    <View style={styles.problemsWrap}>
                        {
                            this.state.problems.map((problem, i) => {
                                return (
                                    <TouchableOpacity
                                        key={i}
                                        style={styles.cardProblem}
                                        onPress={() => this.props.navigation.navigate(
                                            'Problem',
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
        alignItems: 'flex-start',
        marginBottom: 36,
    },
    btnBack: {
        flex: 0,
        width: 20,
    },
    avatarWrap: {
        height: 119,
        width: 119,
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
import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { Text, Button } from 'react-native-elements'
import Storage, { Frustrations } from '../firebase';
import Page from '../components/Page';
import Colors from '../constants/Colors';

import CommonStyles from '../styles/common';
import Typography from '../styles/typography';
import Container from '../components/Container';
import Input from '../components/Input';
import { getImageByDisappointment } from '../helpers/problem';

import backIcon from '../assets/images/back.png';
import LOGO from '../assets/images/logo-gray.png';
import Plus from '../assets/images/plus-purple.png';

function BTN(props) {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.dBtn, props.selected && styles.selectedButton ]}>
            <Image source={getImageByDisappointment(props.disappointment)} style={styles.btnImg} />
            <Text>{props.disappointment}</Text>
        </TouchableOpacity>
    );
}

export default class Problem extends React.Component {
    editable = true;

    state = {
        problem: {
            disappointment: 'Easy',
        },
        answers: [],
        error: '',
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('id');

        if (id) {
            const problem = await Storage.getProblemById(id);
            const answers = await Storage.getAnswersByProblem(id);

            this.editable = false;
            this.setState({ problem, answers });
        }
    }

    createProblem = async () => {
        const { problem } = this.state;

        try {
            await Storage.createProblem(problem);
            alert('ok');
        } catch(err) {
            this.setState({ error: err.message });
        }
    }

    onChange = (field, val) => {
        this.setState(prev => ({ error: '', problem: { ...prev.problem, [field]: val } }));
    }

    render() {
        const { problem, error, answers } = this.state;

        return (
            <Page style={{ backgroundColor: '#fff' }}>
                <Container>
                    <View style={styles.headerNav}>
                        <TouchableOpacity style={styles.btnBack}>
                            <Image source={backIcon} style={styles.backIcon} />
                        </TouchableOpacity>

                        <Image source={LOGO} style={styles.logo} />

                        <View style={styles.plusWrap}></View>
                    </View>

                    <Text style={[Typography.InputLable]}>Title</Text>
                    <Input
                        onChangeText={t => this.onChange('title', t)}
                        editable={this.editable}
                        value={problem && problem.title}
                        style={Typography.h2}
                        placeholder="Your problem title"
                    />

                    <Text style={[Typography.InputLable, { marginTop: 32 }]}>Problem description</Text>
                    <Input
                        onChangeText={t => this.onChange('description', t)}
                        editable={this.editable}
                        value={problem && problem.description}
                        placeholder="Describe your problem"
                        style={styles.mb40}
                    />

                    <Text style={[Typography.InputLable]}>Dissapoint level</Text>

                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                        {Frustrations.map(f => (
                            <BTN
                                key={f}
                                disappointment={f}
                                onPress={() => this.setState(prev => ({ problem: { ...prev.problem, disappointment: f } }))}
                                selected={problem && (problem.disappointment === f)}
                            />
                        ))}
                    </View>

                    <Button
                        onPress={this.tryToLogin}
                        title="share problem"
                        buttonStyle={[CommonStyles.button, styles.button]}
                        titleStyle={[Typography.button]}
                    />

                    {!!error && <Text>{error}</Text>}

                    {!!answers && answers.map((a, i) => <Text key={i}>{a.isProblem.toString()}</Text>) }
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
        marginTop: 68,
        marginBottom: 36,
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
    },
    plus: {
        width: 16,
        height: 16,
        transform: [{ rotate: '45deg' }],
    },
    mb40: {
        marginBottom: 40,
    },
    dBtn: {
        height: 93,
        width: 93,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.borderGray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedButton: {
        borderColor: Colors.purple,
    },
    btnImg: {
        marginTop: 16,
        marginBottom: 8,
        height: 41,
        width: 53,
    },
    button: {
        marginTop: 36,
    },
});
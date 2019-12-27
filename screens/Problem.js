import React from 'react'
import { SafeAreaView, StyleSheet, Button, View } from 'react-native'
import { Text, Input } from 'react-native-elements'
import Storage, { Frustrations } from '../firebase';

export default class Problem extends React.Component {
    editable = true;

    state = {
        problem: null,
        answers: [],
        error: '',
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('id');

        if (id) {
            const problem = await Storage.getProblemById(id);
            const answers = await Storage.getAnswersByProblem(id);
            console.log('answers', answers);
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
            <SafeAreaView>
                <Text>Title</Text>
                <Input onChangeText={t => this.onChange('title', t)} editable={this.editable} value={problem && problem.title} />

                <Text>Description</Text>
                <Input onChangeText={t => this.onChange('description', t)} editable={this.editable} value={problem && problem.description} />

                {this.editable && Frustrations.map(f => <Button key={f} title={f} onPress={prev => ({ problem: { ...prev.problem, frustration: f }})} />)}

                {this.editable && <Button title="Save" onPress={this.createProblem} />}
                {!!error && <Text>{error}</Text>}

                {!!answers && answers.map((a, i) => <Text key={i}>{a.isProblem.toString()}</Text>) }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({});
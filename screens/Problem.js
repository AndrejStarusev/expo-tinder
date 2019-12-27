import React from 'react'
import { SafeAreaView, StyleSheet, Button } from 'react-native'
import { Text, Input } from 'react-native-elements'
import Storage, { Frustrations } from '../firebase';

export default class Problem extends React.Component {
    editable = true;

    state = {
        problem: null,
        error: '',
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('id');

        if (id) {
            const problem = Storage.getProblemById(id);
            this.editable = false;
            this.setState({ problem });
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
        const { problem, error } = this.state;

        return (
            <SafeAreaView>
                <Text>Title</Text>
                <Input onChangeText={t => this.onChange('title', t)} editable={this.editable} />

                <Text>Description</Text>
                <Input onChangeText={t => this.onChange('description', t)} editable={this.editable} />

                {Frustrations.map(f => <Button key={f} title={f} onPress={prev => ({ problem: { ...prev.problem, frustration: f }})} />)}

                {this.editable && <Button title="Save" onPress={this.createProblem} />}
                {!!error && <Text>{error}</Text>}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({});
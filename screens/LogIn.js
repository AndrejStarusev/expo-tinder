import React from 'react'
import { SafeAreaView, StyleSheet, TextInput } from 'react-native'
import { Input, Button, Text } from 'react-native-elements'
import Firebase from '../firebase';

export default class LogIn extends React.Component {
    state = {
        email: 'andrejstarusev@gmail.com',
        password: '',
        err: '',
    }

    tryToLogin = async () => {
        const { email, password, err } = this.state;

        if (err) {
            this.setState({ err: '' });
        }

        try {
            await Firebase.login(email, password);
            this.props.navigation.navigate('Home');
        } catch (err) {
            this.setState({ err: err.message });
        }
    }

    render() {
        const { err } = this.state;
        return (
            <SafeAreaView>
                <Text>Log In</Text>

                <Text>Email</Text>
                <Input onChangeText={text => this.setState({ email: text })} autoCapitalize="none" value="andrejstarusev@gmail.com" />
                
                <Text>Password</Text>
                <Input onChangeText={text => this.setState({ password: text })} autoCapitalize="none" />

                {!!err && <Text>{err}</Text>}

                <Button onPress={this.tryToLogin} title="Log In" />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: '#3F3F3F',
  },
  subtitle: {
    color: '#A5A5A5',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
  }
});
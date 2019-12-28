import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Button, Text } from 'react-native-elements'
import Firebase from '../firebase';
import CommonStyles from '../styles/common';
import Typography from '../styles/typography';
import Container from '../components/Container';
import Page from '../components/Page';
import Input from '../components/Input';

import LOGO from '../assets/images/logo-black.png';
import Colors from '../constants/Colors';

export default class LogIn extends React.Component {
    state = {
        email: '',
        password: '',
        err: '',
    }

    tryToLogin = async () => {
        const { email, password, err } = this.state;
        console.log('tryToLogin', email, password);

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
            <Page style={styles.page}>
                <Container style={styles.container}>
                    <View style={styles.logoWrap}>
                        <Image source={ LOGO } style={styles.logo} />
                        <Text style={[Typography.p, styles.subtitle]}>let's solve problems all together!</Text>
                    </View>

                    <View style={{ position: 'relative', width: '100%', marginBottom: 150 }}>
                        <Text style={[Typography.InputLable]}>Email</Text>
                        <Input
                            onChangeText={text => this.setState({ email: text })}
                            autoCapitalize="none"
                            style={styles.mb24}
                            textContentType="emailAddress"
                            placeholder="hello@zajno.com"
                        />
                        
                        <Text style={[Typography.InputLable]}>Password</Text>
                        <Input
                            onChangeText={text => this.setState({ password: text })}
                            autoCapitalize="none"
                            style={styles.mb7}
                            textContentType="password"
                            secureTextEntry
                            placeholder="Password"
                        />
                        {!!err && <Text>{err}</Text>}
                        <Text style={[Typography.p, styles.forgot]}>Forgot password?</Text>
                        <Button
                            onPress={this.tryToLogin}
                            title="Log In"
                            buttonStyle={[CommonStyles.button, styles.button]}
                            titleStyle={[Typography.button]}
                        />
                    </View>

                    <Text style={Typography.p}>Don’t have an account? <Text style={{ color: Colors.purple }}>Sign Up</Text></Text>
                </Container>
            </Page>
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
  },
  err: {
      position: 'absolute'
  },
  page: {
      flex: 1,
      paddingTop: 30,
  },
  container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  mb24: {
      marginBottom: 24,
  },
  mb7: {
      marginBottom: 7,
  },
  button: {
      marginTop: 40,
  },
  forgot: {
      alignSelf: 'flex-end',
      fontWeight: '300',
  },
  logo: {
      marginTop: 30,
      width: 225,
      height: 52,
  },
  logoWrap: {
      alignItems: 'center',
  },
  subtitle: {
      fontWeight: '300',
      textTransform: 'uppercase',
      marginTop: 12,
  }
});
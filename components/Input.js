import React from 'react'
import { TextInput } from 'react-native'
import CommonStyles from '../styles/common';
import Colors from '../constants/Colors';

export default class Input extends React.Component {
    state = {
        focused: false,
    }

    render() {
        const { focused } = this.state;
        const { props } = this;

        const style = focused
            ? [{ ...CommonStyles.Input, borderColor: Colors.blue }, props.style]
            : [CommonStyles.Input, props.style];

        return (
            <TextInput
                style={style}
                onFocus={() => this.setState({ focused: true })}
                onBlur={() => this.setState({ focused: false })}

                textContentType={props.textContentType}
                secureTextEntry={props.secureTextEntry}
                placeholder={props.placeholder}
            />
        )
    }
}

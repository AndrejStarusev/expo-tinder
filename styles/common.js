import { StyleSheet } from 'react-native'
import Colors from '../constants/Colors';

export default StyleSheet.create({
    Input: {
        width: '100%',
        height: 46,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grayText,
        backgroundColor: 'transparent',
        borderRadius: 7,
        color: Colors.blackText,
    },
    button: {
        backgroundColor: Colors.purple,
        borderRadius: 25,
        height: 50,
    }
});
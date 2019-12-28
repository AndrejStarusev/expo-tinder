import { StyleSheet } from 'react-native'
import Colors from '../constants/Colors';

export default StyleSheet.create({
    Input: {
        width: '100%',
        height: 46,
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: Colors.white,
        borderRadius: 7,
        color: Colors.blackText,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: Colors.blue,
        borderRadius: 8,
        height: 50,
    }
});
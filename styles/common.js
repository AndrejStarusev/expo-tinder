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
    },
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: { width: 2, height: 2 },
        borderWidth: 1,
        borderColor: Colors.borderGray,
        borderRadius: 44 / 2,
    }
});
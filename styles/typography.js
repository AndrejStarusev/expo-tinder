import { StyleSheet } from 'react-native'
import Colors from '../constants/Colors';

export default StyleSheet.create({
    InputLable: {
        // fontFamily: 'Proxima Nova Soft',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 19,
        color: Colors.grayText,
        marginBottom: 8,
    },
    p: {
        // fontFamily: 'Proxima Nova Soft',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 17,
        color: Colors.grayText,
    },
    button: {
        // fontFamily: 'Proxima Nova Soft',
        textTransform: 'uppercase',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 17,
        lineHeight: 20,
    },
    h2: {
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 24,
        lineHeight: 29,
        color: Colors.blackText,
    },
});
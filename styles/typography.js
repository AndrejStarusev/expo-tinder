import { StyleSheet } from 'react-native'
import Colors from '../constants/Colors';

const p = {
    // fontFamily: 'Proxima Nova Soft',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 17,
    color: Colors.grayText,
};

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
    p,
    pPurple: {
        ...p,
        color: Colors.purpleText,
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
    pSmall: {
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 10,
        lineHeight: 12,
        color: Colors.grayText,
        textTransform: 'uppercase',
    }
});
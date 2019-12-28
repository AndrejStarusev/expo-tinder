import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors';

import BG from '../assets/images/home-bg.png';
import Notch from '../assets/images/BG.png';

export default class Page extends React.Component {
    render() {
        const { withBg, withNotch, notchOffset } = this.props;
        return (
            <View style={[styles.page, this.props.style]}>
                {withBg && <Image source={BG} style={styles.bg} />}
                {withNotch && <Image source={Notch} style={[styles.notch, { top: notchOffset }]} />}

                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        width: Layout.window.width,
        backgroundColor: Colors.grayBG,
        flex: 1,
    },
    bg: {
        height: Layout.window.height,
        width: Layout.window.width,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    notch: {
        width: Layout.window.width,
        height: 300,
        position: 'absolute',
        top: 0,
    },
})

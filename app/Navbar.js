import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

export default class Navbar extends Component {
    render(){
        return (
            <View style={styles.content}>
                <TouchableOpacity 
                    style={styles.containerButton}
                    onPress={this.props.openModal}
                    >
                    <Text>New</Text>
                </TouchableOpacity>
                <Text style={styles.textCenter}>Remember Me</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        paddingTop: 30,
        paddingBottom: 10,
        backgroundColor: '#81C04d',
        flexDirection: 'row'
    },
    containerButton: {
        position: 'absolute',
        top: 30,
        zIndex: 1,
        left: 8
    },
    textCenter: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})
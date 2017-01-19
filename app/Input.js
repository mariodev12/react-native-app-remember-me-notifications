import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight
} from 'react-native'

import DatePicker from 'react-native-datepicker'
import Modal from 'react-native-animated-modal'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Input extends Component {
    render(){
        return (
            <View style={styles.container}>
                <Modal style={styles.modalTop} isVisible={this.props.isVisible}
                    animationIn={'slideInLeft'}
                    animationOut={'slideOutRight'}
                >
                    <View style={styles.modalContent}>
                        <TouchableHighlight onPress={this.props.onCloseModal}>
                            <Icon 
                                name="times"
                                size={20}
                                color="black"
                            />
                        </TouchableHighlight>
                        <TextInput 
                            value={this.props.title}
                            placeholder="Title"
                            style={styles.input}
                            onChangeText={(title) => this.props.onChangeTitle(title)}
                        />
                        <DatePicker 
                            date={this.props.date}
                            mode="datetime"
                            placeholder="Date"
                            format="YYYY-MM-DD HH:mm"
                            minDate="2017-01-01"
                            maxDate="2050-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => this.props.onChangeDate(date)}
                        />
                        <TouchableHighlight
                            style={styles.button}
                            onPress={this.props.onHandleItems}
                        >
                            <Text style={styles.buttonText}>Send</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modalTop: {
        justifyContent: 'flex-start',
        marginTop: 50
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 25,
        borderRadius: 5
    },
    input: {
        marginBottom: 5,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 3
    },
    button:{
        backgroundColor: 'skyblue',
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 5
    },
    buttonText: {
        textAlign: 'center'
    }
})
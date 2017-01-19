import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    ListView,
    TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

export default class Items extends Component {
    render(){
        return (
            <View style={{flex: 1}}>
                <ListView 
                    style={styles.list}
                    enableEmptySections
                    dataSource={this.props.dataSource}
                    renderRow={({key, ...value}) => {
                        const activate = (
                            <TouchableOpacity onPress={() => this.props.handleNotifications(value, key)}>
                                <Icon 
                                    name="bell-o"
                                    size={20}
                                    color="#000"
                                />
                            </TouchableOpacity>
                        )
                        const desactivate = (
                            <TouchableOpacity onPress={() => this.props.handleRemoveNotifications(key)}>
                                <Icon 
                                    name="bell-slash-o"
                                    size={20}
                                    color="#000"
                                />
                            </TouchableOpacity>
                        )
                        const deleteRow = (
                                <Icon 
                                    name="times"
                                    size={20}
                                    color="red"
                                />
                        )
                        return (
                            <View style={styles.row}>
                                <Text>{value.title}</Text>
                                <Text>{value.date}</Text>
                                <TouchableOpacity onPress={()=> this.props.onRemoveItems(key)}>
                                    {deleteRow}
                                </TouchableOpacity>
                                {value.notification ? desactivate : activate}
                            </View>
                        )
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff',
        marginBottom: 5,
        marginHorizontal: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
    },
    list: {
        marginTop: 5
    }
})
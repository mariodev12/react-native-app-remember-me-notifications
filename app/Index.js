import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    ListView,
    AsyncStorage
} from 'react-native'

import Navbar from './Navbar'
import Input from './Input'
import Items from './Items'

import PushNotification from 'react-native-push-notification'
import moment from 'moment'

PushNotification.configure({
    onRegister: function(token){
        console.log('Token:', token)
    },
    onNotification: function(notification){
        console.log('Notification', notification)
    },
    permissions: {alert: true, badge: true, sound: true},
    popInitialNotification: true,
    requestPermissions: true
})

export default class Index extends Component {
    constructor(props){
        super(props)

        const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});

        this.state = {
            dataSource: ds.cloneWithRows([]),
            items: [],
            title: '',
            date: '',
            isVisible: false
        }
        this.handleToggleNotifications = this.handleToggleNotifications.bind(this)
        this.handleRemoveNotifications = this.handleRemoveNotifications.bind(this)
        this.handleNotifications = this.handleNotifications.bind(this)
        this.handleModalShow = this.handleModalShow.bind(this)
        this.handleModalHide = this.handleModalHide.bind(this)
        this.handleRemoveItem = this.handleRemoveItem.bind(this)
        this.handleState = this.handleState.bind(this)
        this.handleAddItems = this.handleAddItems.bind(this)
        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
    }

    componentWillMount() {
        //string {title :'', date:''}
        AsyncStorage.getItem('items').then((json) => {
            try {
                const items = JSON.parse(json)
                this.handleState(items, items)
            } catch (err){
                console.log(err)
            }
        })
    }

    handleToggleNotifications(key, notification){
        const newItems = this.state.items.map((item) => {
            if(item.key !== key) return item
            return {
                ...item,
                notification
            }
        })
        this.handleState(newItems, newItems)
    }

    handleRemoveNotifications(key){
        PushNotification.cancelLocalNotifications({id: key})
        this.handleToggleNotifications(key, false)
    }

    handleNotifications(value, key){
        PushNotification.localNotificationSchedule({
            userInfo: {id: key},
            message: value.title,
            date: moment(value.date, "YYYY-MM-DD HH:mm").toDate()
        })
        this.handleToggleNotifications(key, true)
    }

    handleState(items, dataSource, obj = {}){
        this.setState({
            items,
            dataSource: this.state.dataSource.cloneWithRows(dataSource),
            ...obj
        })
        AsyncStorage.setItem('items', JSON.stringify(items));
    }
    handleAddItems(){
        if(!this.state.title && !this.state.date) return
        const newItems = [
            ... this.state.items,
            {
                key: Date.now(),
                title: this.state.title,
                date: this.state.date,
                notification: false
            }
        ]
        this.handleState(newItems, newItems, {title :'', date: ''})
        this.handleModalHide()
    }

    handleRemoveItem(key){
        const newItems = this.state.items.filter((item) => {
            return item.key !== key
        })
        this.handleRemoveNotifications(key)
        this.handleToggleNotifications(key, false)
        this.handleState(newItems,newItems)
    }

    onChangeTitle(title){
        this.setState({title})
    }
    onChangeDate(date){
        this.setState({date})
    }
    handleModalShow(){
        this.setState({isVisible: true})
    }
    handleModalHide(){
        this.setState({isVisible: false})
    }
    render(){
        return (
            <View style={styles.container}>
                <Navbar 
                    openModal={this.handleModalShow}
                />
                <Input 
                    onChangeTitle={this.onChangeTitle}
                    onChangeDate={this.onChangeDate}
                    onHandleItems={this.handleAddItems}
                    date={this.state.date}
                    title={this.state.title}
                    isVisible={this.state.isVisible}
                    onCloseModal={this.handleModalHide}
                />
                <Items 
                    dataSource={this.state.dataSource}
                    onRemoveItems={this.handleRemoveItem}
                    handleRemoveNotifications={this.handleRemoveNotifications}
                    handleNotifications={this.handleNotifications}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F1ED'
    }
})
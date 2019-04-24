import React, { Component } from 'react';
import {View, StyleSheet } from 'react-native';
import { showMessage } from "react-native-flash-message";
import { LoginManager, AccessToken} from 'react-native-fbsdk';
import {Avatar, SocialIcon} from 'react-native-elements';
import { throwStatement } from '@babel/types';



export default class Facebook extends Component {
    constructor(props) {
      super(props);
      this.state = {
        avatar: null,
        title: "Continue with Facebook"
      };
    }

    componentWillMount(){
      this._checkStatus();
    }

    _checkStatus = () => {
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          const { accessToken } = data;
          this.getInfoUser(accessToken);
        }
)
    }

    _login = () => {
      LoginManager.logInWithReadPermissions(["public_profile"]).then(
        function(result) {
          if (result.isCancelled) {
            console.log("Login cancelled");
          } else {
            console.log("Login successfull");
          }
        },
        function(error) {
          console.log("Login fail with error: " + error);
        }
      );
      this._checkStatus();
    }

    getInfoUser = token => {
      fetch('https://graph.facebook.com/v2.5/me?fields=name&access_token=' + token)
      .then((response) => response.json())
      .then((json) => {
        showMessage({
          message: "Hi, " + json.name,
          type: "success",
        });
        this.getInfoAvatar(json.id);
      })
      .catch((error) => {
        console.error(error);
      })
    }
  
    getInfoAvatar = (id) => {
      fetch ("http://graph.facebook.com/" + id + "/picture?type=square&redirect=false")
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          avatar: json.data.url,
          title: 'Log out'
        });
      })
  
      .catch((error) => {
        console.error(error);
      })
    }
  
    onClick = () => {
      if(!this.state.avatar){
        this._login();
      }
      else{
        this.setState({
          avatar: null,
          title: "Continue with Facebook"
        });
      }
    }
    render() {
      return (
        <View style={styles.container}>
          { this.state.avatar &&
          <View style={styles.avatar}>
            <Avatar
            rounded
            source={{uri: this.state.avatar}}
            size="large"
          />
          </View>         
          }
          <SocialIcon
            style={{ width: 210, height: 35 }}
            title={this.state.title}
            button
            type='facebook'
            onPress={this.onClick}
          />
        </View>
      );
    }
  }


const styles = StyleSheet.create({
  container: {
      padding: 5,
      marginLeft: 'auto',
      marginRight: 'auto'
  },
  avatar: {
      padding: 10,
      marginLeft: 'auto',
      marginRight: 'auto'
  }
});
import React, { Component } from 'react';
import {View, StyleSheet } from 'react-native';
import { showMessage } from "react-native-flash-message";
import { LoginButton, AccessToken} from 'react-native-fbsdk';
import {Avatar} from 'react-native-elements';

export default class Facebook extends Component {
    constructor(props) {
      super(props);
      this.state = {
        avatar: null
      };
    }

    getInfoUser = token => {
      fetch('https://graph.facebook.com/v2.5/me?fields=name&access_token=' + token)
      .then((response) => response.json())
      .then((json) => {
        showMessage({
          message: "Hi, " + json.name,
          type: "success",
        });
        this.getInfoAvatar(json.id + '');
  
      })
      .catch((error) => {
        console.error(error);
      })
    }
  
    getInfoAvatar = (id) => {
      fetch ("http://graph.facebook.com/" + id + "/picture?type=square&redirect=false")
      .then((response) => response.json())
      .then((json) => {
        this.setState({avatar: json.data.url});
      })
  
      .catch((error) => {
        console.error(error);
      })
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
          <LoginButton
            readPermissions={['public_profile']}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  console.log("login has error: " + result.error);
                } else if (result.isCancelled) {
                  console.log("login is cancelled.");
                } else {
                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      const { accessToken } = data;
                      this.getInfoUser(accessToken);
                    }
                  )
                }
              }
            }
            onLogoutFinished={() => this.setState({avatar: null})}/>
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
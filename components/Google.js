import React, { Component } from 'react';
import {View, StyleSheet } from 'react-native';
// import { showMessage } from "react-native-flash-message";
import {Avatar} from 'react-native-elements';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import {SocialIcon} from 'react-native-elements';

export default class Google extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            webClientId: '409219658959-4gf4u9uggeindv507eo2fd6166gjbdbq.apps.googleusercontent.com',
            userInfo: null,
            title: 'Continue with Google',
            isLogin: false
        });
    }
    componentWillMount(){
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: this.state.webClientId,
          });
        this.getCurrentUserInfo();
    }

    _signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          this.setState({ 
            userInfo: userInfo.user,
            title: 'Log out',
            isLogin: true 
          });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (f.e. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      };

    getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            this.setState({ 
              userInfo: userInfo.user,
              title: 'Log out',
              isLogin: true
            });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            // user has not signed in yet
            } else {
            // some other error
            }
        }
    };

    _signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          this.setState({ 
            userInfo: null,
            title: 'Continue with Google',
            isLogin: false 
          });
        } catch (error) {
          console.error(error);
        }
    };

    onClick = () => {
      console.log(this.state.isLogin);
      if (!this.state.isLogin){
        this._signIn();
      }else{
        this._signOut();
      }
    }

    render() {
      return (
        <View style={styles.container}>
          { this.state.isLogin &&
            <View style={styles.avatar}>
              <Avatar
              rounded
              source={{uri: this.state.userInfo.photo}}
              size="large"
            />
            </View>
          }
          <SocialIcon
            style={{ width: 210, height: 35 }}
            title={this.state.title}
            button
            type='google-plus-official'
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
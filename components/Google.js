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
            userInfo: null
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
          this.setState({ userInfo: userInfo.user });
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
            this.setState({ userInfo: userInfo.user });
            console.log(userInfo);
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
          this.setState({ userInfo: null });
        } catch (error) {
          console.error(error);
        }
    };

    render() {
      return (
        <View style={styles.container}>
          { this.state.userInfo &&
          <View>
          <View style={styles.avatar}>
            <Avatar
            rounded
            source={{uri: this.state.userInfo.photo}}
            size="large"
          />
          </View>
          <View style={styles.avatar}>
            <SocialIcon
            style={{ width: 195, height: 35 }}
            title='Log out'
            button
            type='google-plus-official'
            onPress={this._signOut}
            />
          </View>
          </View>
          }
          { !this.state.userInfo &&
            <GoogleSigninButton
                style={{ width: 200, height: 39 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={this._signIn}
            />
           }
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
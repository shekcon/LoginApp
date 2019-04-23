import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView } from 'react-native';
import FlashMessage from "react-native-flash-message";
import Facebook from "./components/Facebook";
import Weather from "./components/Weather";
import Header from "./components/Header";


export default class App extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Header />
        <Facebook/>
        <Weather />
        <FlashMessage position="top" />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    color: '#ecf0f1',
    padding: 8,
  }
});

AppRegistry.registerComponent('LoginApp', () => App);

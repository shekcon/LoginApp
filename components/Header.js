import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';


export default class Header extends Component {
    render() {
      return (
      <View>
        <View style={styles.containerTop}>
            <Text style={styles.contentTop}> Weather App </Text>
        </View>
        <View style={styles.containerBottom}>
          <Text style={styles.contentBottom}> Weather Statistics </Text>
        </View>
      </View>
      );
    }
  }

const styles = StyleSheet.create({
    containerTop: {
        backgroundColor: '#18dcff',
    },
    contentTop: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 20,
        color: '#f6f6f6',
        textAlign: 'center',
        },
    containerBottom: {
        padding: 20,
    },
    contentBottom: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
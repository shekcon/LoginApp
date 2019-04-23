import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Picker,
  TextInput,
  ImageBackground,
} from 'react-native';


export default class Weather extends Component {
    constructor(props) {
      super(props);
      this.state = {
        city: '',
        cities: require('../listofcities.json'),
        weather: null,
      };
    }

    handleUser = (props) => {
      var match = this.state.cities.filter(ct =>
        ct.name.toLowerCase().startsWith(props.toLowerCase())
      );
      if (match.length > 0 && this.state.city !== match[0].name){
        this.updateState(match[0]);
      }
      else if (match.length == 0)
      {
        var suggest = this.state.cities.filter(ct =>
          ct.name.toLowerCase().match(props.toLowerCase())
        );
        if (suggest.length > 0 && this.state.city !== suggest[0].name) {
          this.updateState(suggest[0]);
        }
      }  
    }
  
    updateState = (city) => {
      this.setState({ city: city.name});
      this.getWeatherAPI(city.id + '');
    }
  
    getWeatherAPI(cityID) {
        const TOKENAPI = '&appid=f8d83b0dd5a5841e67bb25d2ce7c7716';
        const ENDPOINTAPI = 'http://api.openweathermap.org/data/2.5/weather?id=';
        return fetch(ENDPOINTAPI + cityID + TOKENAPI)
            .then(response => response.json())
            .then(responseJson => {
            if (responseJson.cod !== "400"){
                this.setState({
                weather: responseJson.main,
                });
            }
            })
            .catch(error => {
            console.error(error);
            });
        }
  
    render() {
      return (
        <View style={styles.container}>
            <TextInput
                label="City"
                mode="outlined"
                onChangeText={text => this.handleUser(text)}
                placeholder="Choose a city"
                style={styles.input}
            />
            <Picker
                selectedValue={this.state.city}
                onValueChange={(v, i) => this.handleUser(v)}
                style={styles.picker}>
                {this.state.cities.map(ct => (
                <Picker.Item label={ct.name} value={ct.name} />
                ))}
            </Picker>
            { this.state.weather !== null &&
                <ImageBackground source={require('../img/background.png')}  style={styles.containerInfo}>
                <View style={styles.contentTop}>
                    <Text style={styles.contentText}>City: {this.state.city}</Text>
                </View>
                <View style={styles.contentBottom}>
                    <Text style={styles.contentText}>Temperature: {(this.state.weather.temp - 273.15).toFixed(2)} C</Text>
                    <Text style={styles.contentText}>Pressure: {Math.round(this.state.weather.pressure)} P</Text>
                    <Text style={styles.contentText}>Humidity: {this.state.weather.humidity} %</Text>
                </View>
                </ImageBackground>
            }
        </View>
      );
    }
  }
  
const styles = StyleSheet.create({
    container: {
      margin: 15,
    },
    input: {
      borderBottomWidth: 2,
      borderColor: '#18dcff',
      textAlign: 'center',
      padding: 4,
      marginLeft: 'auto',
      marginRight: 'auto',
      fontSize: 18,
      width: '80%',
    },
    picker: {
      height: 100,
      width: '87%',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    containerInfo: {
      marginTop: 120,
      width: '100%',
      height: 420,
      color: "#ffffff",
      marginBottom: 20
    },
    contentTop: {
      marginTop: 20,
    },
    contentBottom: {
      marginTop: 280,
    },
    contentText: {
      paddingLeft: 5,
      color: "#dfe4ea",
      fontSize: 20
    }
});
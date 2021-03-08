import React, { Component } from 'react';
import {
  ActivityIndicator, FlatList,
  ScrollView, SafeAreaView, TextInput, Button, View
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import Department from '../components/Department';
import RestApi from '../apis/rest';

import { API_URL } from '../configs';

const styles = {
  container: {
    flex: 1,
  },
  searchBox: {
    margin: 20,
  },
  label: {
    fontSize: 12,
    marginBottom: 10
  },
  input: {
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'black',
    marginBottom: 10
  },
  button: {
    backgroundColor: 'transparent',
    height: 44,
    padding: 10,
    fontSize: 20,
    marginBottom: 10
  },
  searchResult: {
    margin: 20
  },
  loadingBox: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItem: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000030'
  }
};

export default class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      city: '',
      state: '',
      distance: '',
      states: [],
      departments: [],
      isLoading: false,
    };

    this.distancesList = [
      {
        value: '5',
      }, {
        value: '10',
      }, {
        value: '20',
      }, {
        value: '50',
      }
    ]
  }

  async componentDidMount() {
    try {
      const response = await RestApi.get(`${API_URL}/configs`);
      const configs = await response.json();
      this.setState({
        states: configs.states
      });
    } catch (e) {
      console.log(e);
    }
  }
  
  handleSubmit = async () => {
    const {
      city, state, distance
    } = this.state;

    if (!city) {
      alert('City is required');
      return;
    }

    if (!state) {
      alert('State is required');
      return;
    }

    if (!distance) {
      alert('Distance is required');
    }

    this.setState({
      isLoading: true
    })

    try {
      const response = await fetch(`${API_URL}/search?city=${city}&state=${state}&distance=${distance}`);
      const departments = await response.json();
      this.setState({
        departments
      });
    } catch (e) {
      console.log(e);
    }

    this.setState({
      isLoading: false
    });
  }

  keyExtractor = (item) => item.id;

  renderItem = ({item}) => (
    <Department
      data={item}
    />
  );

  render() {
    const {
      states, city, state, distance, isLoading
    } = this.state;
    const statesList = states.map((data) => ({ value: data.name }));

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.container}>
            <View style={styles.searchBox}>
              <TextInput 
                placeholder={'City'}
                value={city}
                onChangeText={(city) => { this.setState({ city }); }}
                style={styles.input}
              />
              <Dropdown
                data={statesList}
                value={state}
                label={'STATE'}
                itemCount={12}
                onChangeText={(state) => { this.setState({ state }); }}
              />
              <Dropdown
                data={this.distancesList}
                onChangeText={(distance) => { this.setState({ distance }); }}
                label={'DISTANCE(miles)'}
                value={distance}
              />
              <Button
                style={styles.button}
                title={'Search'}
                color={'#222'}
                onPress={this.handleSubmit}/>
            </View>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.departments}
              style={styles.searchResult}
              renderItem={this.renderItem}
            />
          </ScrollView>
        </SafeAreaView>
        {
          isLoading && (
            <View style={styles.loadingBox}>
              <ActivityIndicator color={'black'} />
            </View>
          )
        }
      </View>
    );
  }
}
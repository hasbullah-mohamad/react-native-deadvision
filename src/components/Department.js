import React from 'react';
import {
  TouchableOpacity, Text, View
} from 'react-native';

const styles = {
  container: {
    borderBottomWidth: 1,
    borderColor: 'black',
    marginBottom: 10
  },
  row: {
    marginBottom: 10,
    flexDirection: 'row'
  },
  label: {
    flex: 2,
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black'
  },
  value: {
    flex: 3,
    fontSize: 14,
    color: 'black'
  }
}

const Department = (props) => {
  const {
    distance,
    department,
    question
  } = props.data;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Bus Name</Text>
        <Text style={styles.value}>{department.bus_name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Addr 1</Text>
        <Text style={styles.value}>{department.bus_name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Addr 2</Text>
        <Text style={styles.value}>{department.bus_name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>City, State Zip</Text>
        <Text style={styles.value}>{department.city_state_zip}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Distance</Text>
        <Text style={styles.value}>{distance} miles</Text>
      </View>
    </View>
  )
}

Department.defaultProps = {
  data: {}
}
export default Department;
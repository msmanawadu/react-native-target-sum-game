import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Game = (props) => {
  const randomNumbers = Array.from({
    length: props.randomNumberCount,
  }).map(() => 1 + Math.floor(Math.random() * 10));

  const target = randomNumbers
    .slice(0, props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.target}>{target}</Text>
      {randomNumbers.map((randomNumber, index) => (
        <Text key={index}>{randomNumber}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4EEFF',
    flex: 1,
    paddingTop: 50,
  },
  target: {
    fontSize: 40,
    backgroundColor: '#DCD6F7',
    marginHorizontal: 50,
    textAlign: 'center',
  },
});

export default Game;

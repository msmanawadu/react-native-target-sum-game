import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text} from 'react-native';
import RandomNumber from './RandomNumber';

export default class Game extends Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
  };

  state = {
    selectedIds: [],
  };

  randomNumbers = Array.from({
    length: this.props.randomNumberCount,
  }).map(() => 1 + Math.floor(Math.random() * 10));

  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  //TODO: Shuffle the random numbers

  isNumberSelected = (numberIndex) => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  };

  selectNumber = (numberIndex) => {
    this.setState((prevState) => {
      return {selectedIds: [...prevState.selectedIds, numberIndex]};
    });
  };

  gameStatus = () => {
    const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
      return acc + this.randomNumbers[curr];
    }, 0);

    if (sumSelected < this.target) {
      return 'PLAYING';
    }
    if (sumSelected === this.target) {
      return 'WON';
    }
    if (sumSelected > this.target) {
      return 'LOST';
    }
  };

  render() {
    const gameStatus = this.gameStatus();
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
          {this.target}
        </Text>
        <View style={styles.randomContainer}>
          {this.randomNumbers.map((randomNumber, index) => (
            <RandomNumber
              key={index}
              id={index}
              number={randomNumber}
              isDisabled={
                this.isNumberSelected(index) || this.gameStatus() !== 'PLAYING'
              }
              onPress={this.selectNumber}
            />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4EEFF',
    flex: 1,
    paddingTop: 50,
  },
  target: {
    fontSize: 50,
    margin: 50,
    textAlign: 'center',
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  STATUS_PLAYING: {
    backgroundColor: '#DCD6F7',
  },
  STATUS_WON: {
    backgroundColor: '#38E54D',
  },
  STATUS_LOST: {
    backgroundColor: '#E64848',
  },
});

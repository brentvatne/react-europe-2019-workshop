import React from 'react';
import { FlatList, Platform, Text, View } from 'react-native';
import SearchLayout from 'react-navigation-addon-search-layout';
import countries from './countries.json';
import stall from './stall';

// on newer versions of react, use trace instead of track and scheduler instead
// of schedule: https://gist.github.com/bvaughn/8de925562903afd2e7a12554adcdda16
import { unstable_track as track } from 'schedule/tracking';

export default class Lists extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    searchText: null,
    data: countries,
  };

  render() {
    let { searchText } = this.state;
    return (
      <SearchLayout
        onChangeQuery={this._handleQueryChange}
        onSubmit={this._executeSearch}>
        <FlatList
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={item => item.code}
        />
      </SearchLayout>
    );
  }

  _handleQueryChange = searchText => {
    // this.setState({ searchText }, () => {
    //   this._executeSearch();
    // });
      track('update query', global.nativePerformanceNow(), () => {
        this.setState({ searchText }, () => {
          this._executeSearch();
        });
      })
  };

  _executeSearch = () => {
    let q = this.state.searchText.toLowerCase();
    let data = countries.filter(
      country =>
        country.name.toLowerCase().includes(q) ||
        country.code.toLowerCase().includes(q)
    );

    // this.setState({ data });
    // // on newer versions of react, use trace instead
    track('update search data', global.nativePerformanceNow(), () => {
      this.setState({ data });
    });
  };

  _renderItem = ({ item }) => {
    return <CountryRow name={item.name} code={item.code} />;
  };
}

class CountryRow extends React.Component {
  render() {
    // Make it very obvious!
    stall(10);

    return (
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row',
          padding: 10,
        }}>
        <View
          style={{
            padding: 5,
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 5,
            marginRight: 10,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: Platform.select({
                ios: 'Menlo',
                default: 'monospace',
              }),
            }}>
            {this.props.code}
          </Text>
        </View>
        <Text style={{ fontSize: 16 }}>{this.props.name}</Text>
      </View>
    );
  }
}

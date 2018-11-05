import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import ExchangeRates from './ExchangeRates'
import DogList from './DogList'
import DogPhoto from './DogPhoto'

const exchangeClient = new ApolloClient({
  uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql',
})

const dogClient = new ApolloClient({
  uri: 'https://nx9zvp49q7.lp.gql.zone/graphql',
})

class App extends Component {
  state = { selectedDog: null }

  onDogSelected = ({ target }) => {
    this.setState(() => ({ selectedDog: target.value }))
  }

  render() {
    return (
      <div>
        <ApolloProvider client={dogClient}>
          <div>
            <h2>Dogs</h2>
            <DogList onDogSelected={this.onDogSelected} />
            {this.state.selectedDog && (
              <DogPhoto breed={this.state.selectedDog} />
            )}
          </div>
        </ApolloProvider>
        <ApolloProvider client={exchangeClient}>
          <div>
            <h2>ExchangeRates</h2>
            <ExchangeRates />
          </div>
        </ApolloProvider>
      </div>
    )
  }
}

export default App

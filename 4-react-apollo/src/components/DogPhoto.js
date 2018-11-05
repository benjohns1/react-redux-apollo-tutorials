import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`

const DogPhoto = ({ breed }) => (
  <Query
    query={GET_DOG_PHOTO}
    variables={{ breed }}
    skip={!breed}
    notifyOnNetworkStatusChange
  >
    {({ loading, error, data, refetch, networkStatus }) => {
      if (networkStatus === 4) return 'Refetching'
      if (loading) return null
      if (error) return `${error}`

      return (
        <div>
          <img
            src={data.dog.displayImage}
            alt={breed}
            style={{ height: 100, width: 100 }}
          />
          <button onClick={() => refetch()}>Refetch</button>
        </div>
      )
    }}
  </Query>
)

export default DogPhoto

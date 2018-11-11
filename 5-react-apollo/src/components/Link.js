import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { DateTime, Interval } from 'luxon'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`

export default class Link extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}.</span>
          {authToken && (
            <Mutation
              mutation={VOTE_MUTATION}
              variables={{ linkId: this.props.link.id }}
              update={(store, { data: { vote } }) =>
                this.props.updateStoreAfterVote(store, vote, this.props.link.id)
              }
            >
              {voteMutation => (
                <div className="ml1 gray f11 pointer" onClick={voteMutation}>
                  ▲
                </div>
              )}
            </Mutation>
          )}
        </div>
        <div className="ml1">
          <div>
            {this.props.link.description} ({this.props.link.url})
          </div>
          <div className="f6 lh-copy gray">
            {this.props.link.votes.length} votes | by{' '}
            {this.props.link.postedBy && this.props.link.postedBy.name
              ? this.props.link.postedBy.name
              : 'Unknown'}{' '}
            {this._formatTimeAgo(this.props.link.createdAt)} ago
          </div>
        </div>
      </div>
    )
  }

  _formatTimeAgo(dateTime) {
    const duration = Interval.fromDateTimes(
      DateTime.fromISO(dateTime),
      DateTime.utc()
    ).toDuration(['years', 'months', 'days', 'hours', 'minutes', 'seconds'])
    if (duration.years > 1) return duration.years + ' years'
    if (duration.years === 1) return 'a year'
    if (duration.months > 1) return duration.months + ' months'
    if (duration.months === 1) return 'a month'
    if (duration.days > 1) return duration.days + ' days'
    if (duration.days === 1) return 'a day'
    if (duration.hours > 1) return duration.hours + ' hours'
    if (duration.hours === 1) return 'an hour'
    if (duration.minutes > 1) return duration.minutes + ' minutes'
    if (duration.minutes === 1) return 'a minute'
    return 'a moment'
  }
}

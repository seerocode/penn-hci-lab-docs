'use strict'

const {google} = require('googleapis')
const datastore = require('@google-cloud/datastore')

const express = require('express')

const {initMocks} = require('../utils/googleMock')

initMocks(google)

process.env.NODE_ENV = 'test'

// Drive ID matches top level folder in mock drive listing
process.env.DRIVE_ID = 'b1ae9c8be6c34aa155f157207a0c840e'
process.env.GOOGLE_CLIENT_ID = 'abc123'
process.env.GOOGLE_CLIENT_SECRET = 'abc123'
process.env.SESSION_SECRET = 'abc123'
process.env.APPROVED_DOMAINS = 'test.com'

const userInfo = {
  emails: [{value: 'test.user@test.com'}],
  email: 'test.user@test.com',
  analyticsUserId: 'asdfjkl123library',
  id: '10',
  userId: '10',
  _json: {domain: 'test.com'}
}

express.request.user = userInfo
express.request.userInfo = userInfo

datastore.prototype.key = () => {}
// datastore.prototype.createQuery = (q) => mockDatastoreQuery(q)

datastore.prototype.runQuery = ({
  kinds
}) => {
  const kind = kinds[0]
  if (kind === 'LibraryViewDoc') {
    return [
      [{
        email: 'test.user@nytimes.com',
        userId: '10',
        lastViewedAt: '2018-07-25T21:15:27.429Z',
        viewCount: 8,
        documentId: '8135b90bcc7085a0daa231d9a1109b5c'
      },
      {
        email: 'test.user@nytimes.com',
        userId: '10',
        lastViewedAt: '2018-07-25T20:45:37.014Z',
        viewCount: 36,
        documentId: '88ca5e30ddb527b4e6266deeef78bff7'
      },
      {
        lastViewedAt: '2018-07-25T20:23:08.840Z',
        viewCount: 10,
        documentId: 'b5a16aaa74bd7e3354f87bd4fa531010',
        email: 'test.user@nytimes.com',
        userId: '10'
      },
      {
        email: 'test.user@nytimes.com',
        userId: '10',
        lastViewedAt: '2018-07-25T20:15:03.458Z',
        viewCount: 1,
        documentId: 'e2536944549231810b2863405fca90ca'
      }
      ],
      {
        moreResults: 'MORE_RESULTS_AFTER_LIMIT',
        endCursor: 'xxxxxxxx'
      }
    ]
  } else {
    return [
      [{
        email: 'test.user@nytimes.com',
        userId: '10',
        lastViewedAt: '2018-07-25T19:50:46.280Z',
        viewCount: 236,
        teamId: 'a370ee8b7d07b9d2d144740083f9dd10'
      },
      {
        lastViewedAt: '2018-06-29T16:45:55.455Z',
        viewCount: 55,
        teamId: '6478ec336324a91b837acf752d7babc4',
        email: 'test.user@nytimes.com',
        userId: '10'
      },
      {
        viewCount: 23,
        teamId: '886297c1fad89a90244cfe6587d2fcd8',
        email: 'test.user@nytimes.com',
        userId: '10',
        lastViewedAt: '2018-07-23T20:04:40.524Z'
      },
      {
        lastViewedAt: '2018-07-24T17:13:56.773Z',
        viewCount: 21,
        teamId: '24e88e5e2ed1f3a42c7884da046ef6ed',
        email: 'test.user@nytimes.com',
        userId: '10'
      },
      {
        teamId: 'e958268cc71fad1faa4a84df0e4aff2b',
        email: 'test.user@nytimes.com',
        userId: '10',
        lastViewedAt: '2017-09-08T15:48:55.751Z',
        viewCount: 12
      }
      ], {
        'moreResults': 'NO_MORE_RESULTS',
        'endCursor': 'xxxxxxxx'
      }
    ]
  }
}

datastore.prototype.get = async () => {
  return [
    {
      viewCount: 5,
      lastViewedAt: '2017-09-08T15:48:55.751Z',
      userId: '10',
      email: 'test.user@nytimes.com'
    }
  ]
}

datastore.prototype.upsert = () => Promise.resolve(true)

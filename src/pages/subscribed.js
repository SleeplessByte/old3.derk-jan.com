import React from 'react'
import { graphql } from 'gatsby'

import { Wrapper } from '../components/Wrapper'
import { Head } from '../components/Head'

const SubscribedPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Wrapper location={location} title={siteTitle}>
      <Head title="Subscribed!" />
      <h1>Subscribed!</h1>
      <p>
        You'll receive the newsletter "Code in Bits and Pieces!" in your inbox.
      </p>
    </Wrapper>
  )
}

export default SubscribedPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

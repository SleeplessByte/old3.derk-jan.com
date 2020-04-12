import React from 'react'
import { graphql } from 'gatsby'

import { Wrapper } from '../components/Wrapper'
import { Head } from '../components/Head'

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Wrapper location={location} title={siteTitle}>
      <Head title="404: Not Found" />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Wrapper>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

// @ts-check

const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
// const { supportedLanguages } = require('./i18n')
const supportedLanguages = { en: 'English' }

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
          return
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges
        const allSlugs = posts.reduce((result, post) => {
          result.add(post.node.fields.slug)
          return result
        }, new Set())

        /*
        const translationsByDirectory = posts.reduce((result, post) => {
          const directoryName = post.node.fields.directoryName
          const langKey = post.node.fields.langKey

          if (directoryName && langKey && langKey !== 'en') {
            ;(result[directoryName] || (result[directoryName] = [])).push(
              langKey
            )
          }

          return result
        }, {})

        const defaultLangPosts = posts.filter(
          ({ node }) => node.fields.langKey === 'en'
        )
        */

        posts.forEach((post, index) => {
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
              translations: [],
              translatedLinks: []
            }
          })
        })

        /*
        console.log({
          allSlugs,
          posts,
          defaultLangPosts
        })

        defaultLangPosts.forEach((post, index) => {
          const previous =
            index === defaultLangPosts.length - 1
              ? null
              : defaultLangPosts[index + 1].node
          const next = index === 0 ? null : defaultLangPosts[index - 1].node

          const translations =
            translationsByDirectory[post.node.fields.directoryName] || []

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
              translations,
              translatedLinks: []
            }
          })

          const otherLangPosts = posts.filter(
            ({ node }) => node.fields.langKey !== 'en'
          )

          otherLangPosts.forEach((post) => {
            const translations =
              translationsByDirectory[post.node.fields.directoryName]

            // Record which links to internal posts have translated versions
            // into this language. We'll replace them before rendering HTML.
            let translatedLinks = []
            const { langKey, maybeAbsoluteLinks } = post.node
              .fields(maybeAbsoluteLinks || [])
              .forEach((link) => {
                if (allSlugs.has(link)) {
                  if (allSlugs.has('/' + langKey + link)) {
                    // This is legit an internal post link,
                    // and it has been already translated.
                    translatedLinks.push(link)
                  } else if (link.startsWith('/' + langKey + '/')) {
                    console.log('-----------------')
                    console.error(
                      `It looks like "${langKey}" translation of "${post.node.frontmatter.title}" ` +
                        `is linking to a translated link: ${link}. Don't do this. Use the original link. ` +
                        `The blog post renderer will automatically use a translation if it is available.`
                    )
                    console.log('-----------------')
                  }
                }
              })

            createPage({
              path: post.node.fields.slug,
              component: blogPost,
              context: {
                slug: post.node.fields.slug,
                translations,
                translatedLinks
              }
            })
          })
        })*/
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    /*
    createNodeField({
      node,
      name: 'slug',
      value: createFilePath({ node, getNode })
    })
    */
    /*
    // Capture a list of what looks to be absolute internal links.
    // We'll later remember which of them have translations,
    // and use that to render localized internal links when available.

    // TODO: check against links with no trailing slashes
    // or that already link to translations.
    const markdown = node.internal.content
    let maybeAbsoluteLinks = []
    let linkRe = /\]\((\/[^\)]+\/)\)/g
    let match = linkRe.exec(markdown)
    while (match != null) {
      maybeAbsoluteLinks.push(match[1])
      match = linkRe.exec(markdown)
    }
    createNodeField({
      node,
      name: 'maybeAbsoluteLinks',
      value: maybeAbsoluteLinks.filter(
        (value, index, self) => self.indexOf(value) === index
      )
    })
    */
  }
}

import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Sidebar from "../components/Sidebar/Sidebar"

const PageTemplate = ({data}) => {
  const {previous, post, next} = data

  const featuredImage = {
    data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }

  console.log("data",data)

  return (
    <Layout>
      <Seo title={post.title} description={post.excerpt} />

      <div className="featured-image">
        {/* if we have a featured image for this post let's display it */}
        {featuredImage?.data && (
            <GatsbyImage
              image={featuredImage.data}
              alt={featuredImage.alt || "Featured Image"}
            />
          )}
      </div>

      <div className="page-body">
        <div className="page-content">
          <header>
            <h1>{parse(post.title)}</h1>
          </header>

          {!!post.content && (
            <section>{parse(post.content)}</section>
          )}

          {/* <div style={{borderBottom:"3px solid black"}}/>

          <footer>
            <p>Published {post.date}</p>
            <p>By {post.author?.node?.name}</p>
          </footer> */}


          {/* <footer>
            <Bio />
          </footer> */}
        </div>

        {/* <section className="comments">
          
        </section> */}

        {/* <nav className="blog-post-nav">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.uri} rel="prev">
                  ← {parse(previous.title)}
                </Link>
              )}
            </li>

            <li>
              {next && (
                <Link to={next.uri} rel="next">
                  {parse(next.title)} →
                </Link>
              )}
            </li>
          </ul>
        </nav> */}

        <Sidebar pages={data?.allWpPage?.nodes || []}/>
      </div>
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageById(
    $id: String!
  ) {
    allWpPage {
      nodes {
        title
      }
    }
    post: wpPage(id: { eq: $id }) {
      id
      author {
        node {
          name
        }
      }
      comments {
        nodes {
          content
        }
      }
      content
      date(formatString: "MMMM DD, YYYY")
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                quality: 100
                placeholder: TRACED_SVG
                layout: FULL_WIDTH
              )
            }
          }
        }
      }
      title
    }
  }
`

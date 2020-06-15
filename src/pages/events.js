import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import eventStyles from './events.module.scss'

const EventsPage = () => {
	const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark (filter:{fields:{type:{eq:"event"}}}) {
                edges {
                    node {
						id
                        frontmatter {
                            title
                            date
                            author
                        }
                        excerpt
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)

	function partition(array, callback) {
		return array.reduce(function (result, element, i) {
			callback(element, i, array)
				? result[0].push(element)
				: result[1].push(element);

			return result;
		}, [[], []]
		);
	};

	// Function to split array into into New Events and Old Events
	const [newEvents, oldEvents] = partition(data.allMarkdownRemark.edges, edge => new Date(edge.node.frontmatter.date) > Date.now())

	return (
		<Layout>
			<SEO title="Events"
				description="Workshops and Events by FOSS Community GEC."
			/>
			<section className="pageTitle">
				<h2>Events</h2>
			</section>

			<div className="container">
				<h3 className={eventStyles.whichEvent}>Upcoming Events</h3>
				<div className={eventStyles.eventsGrid}>
					{newEvents.map(edge => (
						<div key={edge.node.id} className={eventStyles.event}>
							<h4>{edge.node.frontmatter.title}</h4>
							<p>{edge.node.frontmatter.date}</p>
							<p>{edge.node.excerpt}</p>
						</div>
					))}
				</div>
			</div>

			<div className="container">
				<h3 className={eventStyles.whichEvent}>Past Events</h3>
				<div className={eventStyles.eventsGrid}>
					{oldEvents.map(edge => (
						<div key={edge.node.id} className={eventStyles.event}>
							<h4>{edge.node.frontmatter.title}</h4>
							<p>{edge.node.frontmatter.date}</p>
							<p>{edge.node.excerpt}</p>
						</div>
					))}
				</div>
			</div>
		</Layout >
	)
}

export default EventsPage

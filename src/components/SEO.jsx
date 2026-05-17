import { Helmet } from 'react-helmet-async'

/**
 * Reusable SEO component for managing page titles and meta descriptions.
 * @param {Object} props
 * @param {string} props.title - The title for the current page.
 * @param {string} props.description - The meta description for the current page.
 */
export default function SEO({ title, description }) {
    const siteTitle = 'Mewat Engineering College (WAQF)'
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle
    
    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description || "A premier engineering institution committed to providing quality technical education and producing competent engineers."} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || "Mewat Engineering College (WAQF) offers B.Tech programs in 5 engineering disciplines."} />
            <meta property="og:type" content="website" />
        </Helmet>
    )
}

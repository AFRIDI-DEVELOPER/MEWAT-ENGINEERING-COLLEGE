import { Link } from 'react-router-dom'

export default function PageHeader({ title, subtitle, breadcrumb }) {
    return (
        <section className="page-header">
            <div className="container">
                <div className="breadcrumb">
                    <Link to="/">Home</Link>
                    <span>›</span>
                    <span className="current">{breadcrumb || title}</span>
                </div>
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
            </div>
        </section>
    )
}

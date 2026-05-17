import { Link } from 'react-router-dom'
import { getAssetPath } from '../utils/assets'

export default function PageHeader({ title, subtitle, breadcrumb }) {
    return (
        <section className="page-header">
            <div className="container">
                <div className="breadcrumb">
                    <Link to="/">Home</Link>
                    <span>›</span>
                    <span className="current">{breadcrumb || title}</span>
                </div>
                <div className="page-title-group">
                    <img src={getAssetPath('/images/mewatengineering logo.png')} alt="" className="page-title-logo" />
                    <h1>{title}</h1>
                </div>
                {subtitle && <p>{subtitle}</p>}
            </div>
        </section>
    )
}

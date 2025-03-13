/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

class BreadCrumb extends React.Component
{
    render()
    {
        return (
            <div className="col-sm-7">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb  float-sm-right">
                        <li className="breadcrumb-item">
                            <a ><i className={this.props.icon1 ? this.props.icon1 : "fas fa-home"}></i> {this.props.name}</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className={this.props.icon2 ? this.props.icon2 : "fas fa-tachometer-alt"}></i> {this.props.property}
                        </li>
                    </ol>
                </nav>
            </div>
        )
    }
}

export default BreadCrumb;
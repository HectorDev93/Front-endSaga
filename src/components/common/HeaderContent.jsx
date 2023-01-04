import React from 'react';
import BreadCrumb from './BreadCrumb';
import Spinner from './Spinner';
class HeaderContent extends React.Component {
   
    render() { 
        return (  

            <header className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                        <div className="col-sm-3">
                            <h1 className="m-0"><i className={this.props.iconProperty}></i> {this.props.property}</h1>
                            
                        </div>  
                        <div className="col-sm-1">
                        <Spinner show={this.props.show}/>
                        </div>
                          <BreadCrumb name={this.props.index} icon1={this.props.iconIndex} property={this.props.property} icon2={this.props.iconProperty}/>
                        </div>
                    </div>
            </header>

        )
    }

}
 
export default HeaderContent;
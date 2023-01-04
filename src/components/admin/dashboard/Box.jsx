import React from 'react';
import { Link } from "react-router-dom";

const Count = props => {

  

        return (  

        
            <div className="col-lg-3 col-xs-6">
                
                            <div className={props.styleBox ? "small-box "+props.styleBox : "small-box bg-info"}>
                                <div className="inner">
                                    <h3>{props.count}</h3>
                                    <p>{props.label ? props.label+": " : ""}
                                    {props.countLabel}</p>
                                </div>
                                <div className="icon">
                                    <i className={props.iconModel}></i>
                                </div>
                                <Link to={props.to} className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>


            );
    
}

export default Count;
import React from 'react';
import Spinner from '../../common/Spinner';
import SuccessAlert from '../../common/SuccessAlert';
import ErrorAlert from '../../common/ErrorAlert';

class Form extends React.Component
{
   /*  constructor(props)
    {
        super(props);
    }
 */
    render()
    {
        return (
            <div>

                <Spinner show={this.props.create_update_spinner}/>
                <SuccessAlert msg={this.props.success_message}/>
                <ErrorAlert msg={this.props.error_message}/>

                <div className="col-md-6">
                    <div className={`form-group ${this.props.validation_errors!=null?'has-error':''}`}>
                        <label>Nombre</label>
                        <input required type="text" className="form-control" placeholder="Nombre" onChange={this.props.handleLocationChange} value={this.props.location.name?this.props.location.name:''} name="name" />
                        {
                            this.props.validation_errors!=null?(<div className="help-block">{this.props.validation_errors.name[0]}</div>):null
                        }
                    </div>
                </div>
                
                <div className="col-md-6">
                    <div className={`form-group ${this.props.validation_errors!=null?'has-error':''}`}>
                        <label>Descripción</label>
                        <input required type="text" className="form-control" placeholder="Descripción" onChange={this.props.handleLocationChange} value={this.props.location.description?this.props.location.description:''} name="description" />
                        {
                            this.props.validation_errors!=null?(<div className="help-block">{this.props.validation_errors.description[0]}</div>):null
                        }
                    </div>
                </div>

            </div>
        )
    }
}

export default Form;
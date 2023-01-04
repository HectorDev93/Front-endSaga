import React from 'react';
import {connect} from 'react-redux';
import {
    addLocation, setLocationDefaults, handleLocationName,
    listAllLocations
} from '../../../store/actions/LocationActions';
//import Form from './Form';


class AddModal extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount()
    {
        this.props.setLocationDefaults();
    }

    handleChange(e) {
        e.preventDefault();

        this.props.handleLocationName(e.target.value);
    }
/* 
    handleSubmit(e) {
        e.preventDefault();
        let self = this;

        this.props.addLocation(this.props.locations.locations.name, function () {

            // reset title
            self.props.handleTitleChange('');

            setTimeout(() => {
                // close modal
                self.props.close_modal();

                // reset defaults
                self.props.setCategoryDefaults();

                // refetch categories
                self.props.listAllCategories();

            }, 2000);
        });
    } */

    render()
    {
        return (
            
            
            
            <div className={'modal' + (this.props.show_modal===true?' show':'')} style={{display: (this.props.show_modal===true?'block':'none')}} id="modal-default">
                <div className="modal-dialog">
                    {/*  <form role="form" method="post" onSubmit={this.handleSubmit}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" aria-label="Close" onClick={this.props.close_modal}>
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Add new category</h4>
                            </div>
                            <div className="modal-body">
                                <Form categories={this.props.categories} onchange={this.handleChange}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" onClick={this.props.close_modal}>Close</button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </form>  */}

                <div className="modal-content">
                            <div className="modal-header">
                                
                            <h4 className="modal-title">Add new location</h4>
                                <button type="button" className="close" aria-label="Close" onClick={this.props.close_modal}>
                                    <span aria-hidden="true">&times;</span></button>
                            </div>
                            <div className="modal-body">
                               
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" onClick={this.props.close_modal}>Close</button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </div>

                </div>
        </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        locations: state.location
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLocationName: (name) => dispatch(handleLocationName(name)),
        addLocation: (name, cb) => dispatch(addLocation(name, cb)),
        setLocationDefaults: () => dispatch(setLocationDefaults()),
        listAllLocations: () => dispatch(listAllLocations()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);
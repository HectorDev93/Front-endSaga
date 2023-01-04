import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteLocation } from '../../../store/actions/LocationActions';

class Row extends React.Component {

    constructor(props)
    {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e) {
        e.preventDefault();

        // eslint-disable-next-line no-restricted-globals
        if(confirm("Are you sure?")) {
            this.props.deleteLocation(this.props.location.id);
        }
    }

    render()
    {
        return (
            <tr>
                <td>{this.props.location.id}</td>
                <td>{this.props.location.name}</td>
                <td>{this.props.location.description}</td>
                <td>
                    <Link to={'/admin/tags/edit/' + this.props.location.id} className="btn btn-primary btn-sm"><i
                        className="fa fa-edit"></i></Link>
                    <a href="#" className="btn btn-danger btn-sm" onClick={this.handleDelete}><i
                        className="fa fa-remove"></i></a>
                </td>
            </tr>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteLocation: (id) => dispatch(deleteLocation(id))
    }
};

export default connect(null, mapDispatchToProps)(Row);
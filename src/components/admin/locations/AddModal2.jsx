import React from 'react';
import {connect} from 'react-redux';
import {
    addLocation, setLocationDefaults, handleLocationChange,
    listAllLocations,
    listLocations
} from '../../../store/actions/LocationActions';
import Form from './Form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class AddModal2 extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleLocationChange = this.handleLocationChange.bind(this);
        //this.handleChange = this.handleChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount()
    {
        this.props.setLocationDefaults();
    }

    handleLocationChange(e) {
        e.preventDefault();
        this.props.handleLocationChange(e.target.name, e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();
        let self = this;
 
        this.props.addLocation(this.props.location.location, function () {


            setTimeout(() => {
                // close modal
                self.props.toggle();

                // reset defaults
                self.props.setLocationDefaults();

               //self.props.listAllLocations();
               self.props.listLocations();

            }, 500);
        }); 
    } 

    render()
    {
        return (
            
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="">
          <form method="post" onSubmit={this.handleSubmit}>
        <ModalHeader>Agregar nueva localidad</ModalHeader>
        <ModalBody>
        <Form location={this.props.location.location} create_update_spinner={this.props.location.create_update_spinner}
                                                  success_message={this.props.location.success_message} error_message={this.props.location.error_message}
                                                  handleLocationChange={this.handleLocationChange}
                                                  validation_errors={this.props.location.validation_errors} />
         </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Guardar</Button>
          <Button color="secondary" onClick={this.props.toggle}>Cancelar</Button>
        </ModalFooter>
        </form>
      </Modal>
            
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        location: state.location
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLocationChange: (field, value, checked= null) => dispatch(handleLocationChange(field, value, checked)),
        addLocation: (name, cb) => dispatch(addLocation(name, cb)),
        setLocationDefaults: () => dispatch(setLocationDefaults()),
        listAllLocations: () => dispatch(listAllLocations()),
        listLocations: (page) => dispatch(listLocations(page))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddModal2);
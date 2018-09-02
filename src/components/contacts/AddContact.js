import React, { Component } from "react";
import uuid from "uuid";

import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  onSubmit = (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    if (name === "") {
      this.setState({
        errors: { name: "Name is Required" }
      });
      return;
    }
    if (email === "") {
      this.setState({
        errors: { email: "Email is Required" }
      });
      return;
    }
    if (phone === "") {
      this.setState({
        errors: { phone: "Phone is Required" }
      });
      return;
    }

    const newContact = {
      id: uuid(),
      name,
      email,
      phone
    };

    dispatch({
      type: "ADD_CONTACT",
      payload: newContact
    });

    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const dispatch = value.dispatch;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label={"Name"}
                    name={"name"}
                    placeholder={"Enter name"}
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />

                  <TextInputGroup
                    label={"Email"}
                    name={"email"}
                    type={"email"}
                    placeholder={"Enter Email"}
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />

                  <TextInputGroup
                    label={"Phone"}
                    name={"phone"}
                    placeholder={"Enter Phone"}
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />

                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;

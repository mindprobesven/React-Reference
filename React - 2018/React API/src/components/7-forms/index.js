import React, { Component } from "react";

function FormOutput(props) {
  const list = [];
  
  for(const key in props.formData) {
    const element = (
      <li key={list.length}>
        {key.toString()} : {props.formData[key].toString()}
      </li>
    );

    list.push(element);
  }
  
  return (
    <ul>
      {list}
    </ul>
  );
}


class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formFields: {
        person: '',
        message: '',
        color: 'Green',
        Apple: false,
        Banana: false,
        Orange: false
      }
    }
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    let value = target.value;
    const formFields = Object.assign({}, this.state.formFields);

    if(target.type === "checkbox") {
     value = target.checked;
    }

    formFields[name] = value;
    this.setState({ formFields: formFields });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('Submitting form: ' + JSON.stringify(this.state.formFields));
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>Name:</label>
          <input type="text" name="person" value={this.state.formFields.name} onChange={(e) => this.handleChange(e)} />
          <br />
          <br />
          <label>Favorite color:</label>
          <select name="color" value={this.state.formFields.color} onChange={(e) => this.handleChange(e)}>
            <option>Green</option>
            <option>Blue</option>
            <option>Yellow</option>
          </select>
          <br />
          <br />
          <textarea name="message" value={this.state.formFields.message} onChange={(e) => this.handleChange(e)}></textarea>
          <br />
          <br />
          <label>Favorite food:</label>
          <input type="checkbox" name="Apple" checked={this.state.formFields.Apple} onChange={(e) => this.handleChange(e)} />
          <input type="checkbox" name="Banana" checked={this.state.formFields.Banana} onChange={(e) => this.handleChange(e)} />
          <input type="checkbox" name="Orange" checked={this.state.formFields.Orange} onChange={(e) => this.handleChange(e)} />
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
        <hr />
        <FormOutput formData={this.state.formFields} />
        <hr />
      </div>
    );
  }
}

export default ContactForm;
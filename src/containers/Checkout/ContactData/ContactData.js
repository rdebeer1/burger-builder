import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          length: 5
        },
        valid: false
      },
      state: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'State'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      forDelivery: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'pickup',
              displayValue: 'Pickup'
            },
            {
              value: 'delivery',
              displayValue: 'Delivery'
            }
          ]
        },
        value: 'pickup'
      },
    },
    loading: false
  }
  
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }
    axios.post('/orders.json', order)
    .then(response => {
      this.setState({
        loading: false
      });
      this.props.history.push('/');
    })
    .catch(error => {
      this.setState({
        loading: false
      });
    });
  }

  checkValidity (value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.length) {
      isValid = value.length === rules.length && isValid
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
     ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    console.log(updatedFormElement)
    this.setState({
      orderForm: updatedOrderForm
    });
  }

  render () {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input 
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))}
        <Button 
          btnType='Success' 
          clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact info</h4>
        {form}
      </div>
    );
  }
}

export default ContactData
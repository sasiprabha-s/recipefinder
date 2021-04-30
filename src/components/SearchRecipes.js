import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setRecipes } from '../actions';

class SearchRecipes extends Component {

  state = {
    ingredients: '',
    dish: ''
  }


  search(e) {
    e.preventDefault();

    let { ingredients, dish } = this.state;

    const url = `http://www.recipepuppy.com/api/?i=${ingredients}&q=${dish}`;

    fetch(url, {
      method: 'GET'
    }).then(response => response.json())
      .then(json => {
        console.log("result", json.results)
        this.props.setRecipes(json.results)
      });
  }

  render() {
    return (
      <Form inline>
        <FormGroup>
          <ControlLabel>Ingredients</ControlLabel>
          {' '}
          <FormControl
            type="text"
            placeholder="garlic, chicken"
            onChange={event => this.setState({ ingredients: event.target.value })}
          />
        </FormGroup>
        {' '}
        <FormGroup>
          <ControlLabel>Dish</ControlLabel>
          {' '}
          <FormControl
            type="text"
            placeholder="adobo"
            onChange={event => this.setState({ dish: event.target.value })}
          />
        </FormGroup>
        {' '}
        <Button onClick={(e) => this.search(e)}>Submit</Button>
      </Form>
    )
  }
}

export default connect(null, { setRecipes })(SearchRecipes);
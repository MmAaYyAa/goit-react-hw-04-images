import { Component } from 'react';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { Notify } from 'notiflix';

export default class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.inputValue.trim() === '') {
      Notify.info('Enter your request');
      return;
    }
    this.props.onSubmit(this.state.inputValue.trim());
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <div>
        <SearchbarHeader className="searchbar">
          <SearchForm className="form" onSubmit={this.handleSubmit}>
            <SearchFormButton type="submit" className="button">
              <SearchFormButtonLabel className="button-label">
                Search
              </SearchFormButtonLabel>
            </SearchFormButton>
            <SearchFormInput
              onChange={this.handleInputChange}
              value={this.state.inputValue}
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </SearchForm>
        </SearchbarHeader>
      </div>
    );
  }
}

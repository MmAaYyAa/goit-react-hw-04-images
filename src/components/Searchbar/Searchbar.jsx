import { useState } from 'react';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { Notify } from 'notiflix';

export default function Searchbar({onSubmit}) {

  const[inputValue,setInputValue]= useState('')
  const handleInputChange = event => {
    setInputValue(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      Notify.info('Enter your request');
      return;
    }
    onSubmit(inputValue.trim());
    setInputValue('');
  };

    return (
      <div>
        <SearchbarHeader className="searchbar">
          <SearchForm className="form" onSubmit={handleSubmit}>
            <SearchFormButton type="submit" className="button">
              <SearchFormButtonLabel className="button-label">
                Search
              </SearchFormButtonLabel>
            </SearchFormButton>
            <SearchFormInput
              onChange={handleInputChange}
              value={inputValue}
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

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

function Autocomplete(props) {
  const [values, setValues] = useState({
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: props.value,
  });

  const {
    activeSuggestion,
    filteredSuggestions,
    showSuggestions,
    userInput,
  } = values;

  let { suggestions, getValue } = props;

  useEffect(() => {
    debugger;
    console.log(suggestions);
    return setValues({
      ...values,
      filteredSuggestions: suggestions,
    });
  }, [suggestions]);

  const onChange = (e) => {
    let userInput = e.currentTarget.value;
    getValue(userInput);
    debugger;
    console.log(suggestions);
    // Filter our suggestions that don't contain the user's input
    let filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1,
    );
    setValues({
      ...values,
      filteredSuggestions,
      activeSuggestion: 0,
      showSuggestions: true,
      userInput,
    });
  };

  const onClick = (e) => {
    setValues({
      ...values,
      filteredSuggestions: [],
      activeSuggestion: 0,
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
    });
  };

  const onKeyDown = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      setValues({
        ...values,
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion],
      });
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setValues({
        ...values,
        activeSuggestion: activeSuggestion - 1,
      });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setValues({
        ...values,
        activeSuggestion: activeSuggestion + 1,
      });
    }
  };

  let suggestionsListComponent;

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul class="auto-complete-suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            let className;

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = 'suggestion-active';
            }

            return (
              <li className={className} key={suggestion} onClick={onClick}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = <div class="no-suggestions"></div>;
    }
  }

  return (
    <Fragment>
      <input
        type="text"
        placeholder={props.placeholder}
        class="input-radius h56"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
      />
      {suggestionsListComponent}
    </Fragment>
  );
}

export default Autocomplete;

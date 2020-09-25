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
  console.log('+++++++++++++++++', suggestions);
  useEffect(() => {
    return setValues({
      ...values,
      filteredSuggestions: suggestions,
    });
  }, [suggestions]);

  const onChange = (e) => {
    let userInput = e.currentTarget.value;
    getValue(userInput);
    console.log('+++++++++++++++++1111', props.suggestions);
    // Filter our suggestions that don't contain the user's input
    let filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1,
    );
    console.log('+++++++++++++++++2222', filteredSuggestions);

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
  useEffect(() => {
    console.log("---------****************--------", filteredSuggestions)
  })
  // const getlist = () => {
  //   let comp = filteredSuggestions.map((data) => <li>{data}</li> )
  //   return comp
  // }
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
        <ul class="auto-complete-suggestions">
          {filteredSuggestions.map((data) => 
                <li onClick={onClick}>
                  {data}
                </li>
            )}
            <li>this is thest</li>
            {/* {getlist()} */}
        </ul>
    </Fragment>
  );
}

export default Autocomplete;

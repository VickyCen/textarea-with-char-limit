import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import './TextareaWithCharLimit.scss';

// Define object types for PassedProps
type PassedProps = {
  maxCharAllowed: number,   // Number of remaining characters allowed
  customErrMsg?: string    // Custom error message if provided
}

const CAPTION = {
  placeholder: "Please type here",
  warningIfCharExceeds: "Characters remaining: "
}

const TextAreaWithCharacterLimit = (props: PassedProps) => {

  const [textTyped, setTextTyped] = useState({ normalText: '', highlightedText: ''});
  const [remainingCharAllowed, setRemainingCharAllowed] = useState(
    props.maxCharAllowed
  );

  // Textarea onChange
  const textAreaOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      hightLightedTextIfExceed(event.target.value);
  }

  // To handel the textarea backdrop scroll position if textarea is scrolling
  const textareaOnScroll = (event: React.UIEvent<HTMLTextAreaElement>) => {
    let scrollTop = event.currentTarget.scrollTop;
    let backdrop = document.getElementById("backdrop-for-highlight");
    if (backdrop) {
      backdrop.scrollTop = scrollTop;
    }
  };

  const hightLightedTextIfExceed = (text: string) => {
    //Convert new line break
    text = text.replace(/\n$/g, '\n\n');
    let textLength = text.length;
    let updatedRemainingCharAllowed = props.maxCharAllowed - textLength;
    if (updatedRemainingCharAllowed > 0) {
      setTextTyped({ normalText: text, highlightedText: '' });
      setRemainingCharAllowed(updatedRemainingCharAllowed);
    } else {
      let textWithoutHighlight = text.substr(0, props.maxCharAllowed);
      let textToHighlight = text.substr(props.maxCharAllowed, textLength);

      setTextTyped({ normalText: textWithoutHighlight, highlightedText: textToHighlight });
      setRemainingCharAllowed(updatedRemainingCharAllowed);
    }
  }

  return (
    <React.Fragment>
      <div className="textarea-container">
        <div className="backdrop" id="backdrop-for-highlight">
            <div className="highlights">
              {textTyped.normalText}
              <mark>{textTyped.highlightedText}</mark>
            </div>
         </div>
        <textarea id="textarea" name="textarea-with-char-limit"
        placeholder={CAPTION.placeholder} tabIndex={1}
        onChange={textAreaOnChange} onScroll={textareaOnScroll} />
      </div>
      <div
          className={
            'textarea-warning-text ' +
            (remainingCharAllowed < 0 ? 'warning-red-color' : '')
          }
        >
          <div>{`${CAPTION.warningIfCharExceeds} ${remainingCharAllowed}`}</div>
        </div>
        {props.customErrMsg && props.customErrMsg !== '' ? (
          <div className="error-label no-top">
            <span className="error-pointy-corner" />
            <span className="error-color">{props.customErrMsg}</span>
          </div>
        ) : (
          ''
        )}
        <div className="clearfix" />
     </React.Fragment>
  );
}

export default TextAreaWithCharacterLimit;

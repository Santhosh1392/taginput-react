/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer, useState } from 'react'
import './styles.scss'

const getId = () => `_${Math.random().toString(36).substr(2, 9)}`;

const TagItem = ({
  tag, isLastIndex, backspacePressedCount, handleOnRemoveTag
}) => {
  return (
    <div
      className={
        `tag__box ${backspacePressedCount === 1 && isLastIndex && 'warning__box'}`
      }
      key={`${getId()}`}
    >
      <span>{tag}</span>
      <span
        className="close__mark"
        onClick={() => handleOnRemoveTag(tag)}>
        ×
      </span>
    </div>
  )
}

const tagsListReducer = (state, action) => {
  const { type, value } = action
  const newState = [...state]
  if (type ===  'ADD_TAG' && value) {
    newState.push(value)
  } else if (type === 'REMOVE_TAG') {
    newState.splice(value, 1)
  }
  return newState
}

const TagsInput = ({
  tags, placeholder, onChange
}) => {
  const [tagsList, setTagsList] = useReducer(tagsListReducer, tags)
  const [tagInputValue, setTagInputValue] = useState('')
  const [backspacePressedCount, setBackspacePressedCount] = useState(0)

  const focusInputElement = () => {
    const element = document.querySelector('#tagsMainInputBox')
    if (element) {
      element.focus()
    }
  }

  useEffect(() => {
    if (onChange instanceof Function) {
      onChange(tagsList)
    }
  }, [tagsList])

  const handleOnKeyDown = (event) => {
    const { key } = event
    if (key === 'Enter' && tagsList.indexOf(tagInputValue) === -1) {
      setTagsList({ type: 'ADD_TAG', value: tagInputValue})
      setTagInputValue('')
      setBackspacePressedCount(0)
    } else if (key === 'Backspace') {
      if (backspacePressedCount === 1 && !tagInputValue) {
        setTagsList({ type: 'REMOVE_TAG', value: tagsList.length - 1})
        setTagInputValue('')
        setBackspacePressedCount(0)
      } else if (!tagInputValue && backspacePressedCount !== 1){
        setBackspacePressedCount(backspacePressedCount + 1)
      }
    }
  }

  const handleOnRemoveTag = (tag) => {
    const tagIndex = tagsList.findIndex(data => data === tag)
    setTagsList({ type: 'REMOVE_TAG', value: tagIndex })
  }

  return (
    <div className="tags-input__contianer" onClick={focusInputElement}>
      <div className="tags__section">
        {tagsList.map((tag, index) => {
          const isLastIndex = (index === (tagsList.length - 1))
          return (
            <TagItem
              tag={tag}
              isLastIndex={isLastIndex}
              backspacePressedCount={backspacePressedCount}
              handleOnRemoveTag={handleOnRemoveTag}
            />
          )}
        )}
        <input
          type="text"
          className="tags__input__box"
          onKeyDown={handleOnKeyDown}
          onChange={(e) => setTagInputValue(e.target.value)}
          name="tagInput"
          value={tagInputValue}
          placeholder={placeholder}
          id="tagsMainInputBox"
        />
      </div>
    </div>
  )
}

TagsInput.defaultProps = {
  placeholder: 'Enter to add',
  tags: []
}

export default TagsInput
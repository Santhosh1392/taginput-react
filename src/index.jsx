/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer, useRef, useState } from 'react'
import './styles.scss'

const getId = () => `_${Math.random().toString(36).substr(2, 9)}`;

const TagItem = ({
  tag, isLastIndex, backspacePressedCount, handleOnRemoveTag, tagClassName
}) => {
  return (
    <div
      className={
        `tag__box ${tagClassName} ${backspacePressedCount === 1 && isLastIndex && 'warning__box'}`
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
  tags, placeholder, onChange, tagClassName
}) => {
  const [tagsList, setTagsList] = useReducer(tagsListReducer, tags)
  const [tagInputValue, setTagInputValue] = useState('')
  const [backspacePressedCount, setBackspacePressedCount] = useState(0)
  const inputRef = useRef(null)

  const focusInputElement = () => {
    if (inputEl) {
      inputEl.current.focus()
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
    <div
      className="tags-input__contianer"
      onClick={focusInputElement}
      tagIndex="0"
    >
      <div className="tags__section">
        {tagsList.map((tag, index) => {
          const isLastIndex = (index === (tagsList.length - 1))
          return (
            <TagItem
              tag={tag}
              isLastIndex={isLastIndex}
              backspacePressedCount={backspacePressedCount}
              handleOnRemoveTag={handleOnRemoveTag}
              tagClassName={tagClassName}
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
          ref={inputRef}
        />
      </div>
    </div>
  )
}

TagsInput.defaultProps = {
  placeholder: 'Enter to add',
  tags: [],
  tagClassName: ''
}

export default TagsInput
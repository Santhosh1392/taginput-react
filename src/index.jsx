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
  let newState = [...state]
  if (type ===  'ADD_TAG' && value) {
    newState.push(value)
  } else if (type === 'REMOVE_TAG') {
    newState.splice(value, 1)
  } else if (type === 'SET_ALL_TAGS') {
    if (state.length != value.length) {
      newState = [...value]
    }
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
    if (inputRef) {
      inputRef.current.focus()
    }
  }

  useEffect(() => {
    if (tagsList.length !== tags.length) {
      setTagsList({ type: 'SET_ALL_TAGS', value: tags})
    }
  }, [tags])

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
      tabIndex="0"
    >
      <div className="tags__section">
        {tagsList.map((tag, index) => {
          const isLastIndex = (index === (tagsList.length - 1))
          return (
            <TagItem
              key={`tagid-${index}`}
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
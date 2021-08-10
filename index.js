

function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

___$insertStyle(".tags-input__contianer {\n  width: 100%;\n  padding: 5px;\n  box-sizing: border-box;\n  border: 2px solid #ddd;\n  border-radius: 5px;\n  background-color: #fff;\n  cursor: pointer;\n  font-family: \"Nunito\", sans-serif;\n}\n.tags-input__contianer .tags__section {\n  display: flex;\n  flex-wrap: wrap;\n}\n.tags-input__contianer .tags__section .tag__box {\n  border: 1px solid #ddd;\n  padding: 5px 10px;\n  color: #333;\n  display: flex;\n  align-items: center;\n  border-radius: 5px;\n  font-size: 16px;\n  margin-right: 5px;\n  background-color: #5a4679;\n  color: #fff;\n}\n.tags-input__contianer .tags__section .tag__box.warning__box {\n  border: 2px solid #ff9189;\n  background-color: #ff9189;\n}\n.tags-input__contianer .tags__section .tag__box.warning__box .close__mark {\n  color: #fff;\n}\n.tags-input__contianer .tags__section .tag__box .close__mark {\n  font-size: 18px;\n  margin-left: 10px;\n  cursor: pointer;\n}\n.tags-input__contianer .tags__section .tags__input__box {\n  padding: 8px 0;\n  padding-left: 5px;\n  box-sizing: border-box;\n  border: none;\n  outline: none;\n  font-size: 16px;\n  margin-top: 2px;\n}");

/* eslint-disable react-hooks/exhaustive-deps */

const getId = () => `_${Math.random().toString(36).substr(2, 9)}`;

const TagItem = ({
  tag, isLastIndex, backspacePressedCount, handleOnRemoveTag, tagClassName
}) => {
  return (
    React__default['default'].createElement('div', {
      className:
        `tag__box ${tagClassName} ${backspacePressedCount === 1 && isLastIndex && 'warning__box'}`,

      key: `${getId()}`
    }, [
      React__default['default'].createElement('span', null, [tag]),
      React__default['default'].createElement('span', {
        className: "close__mark",
        onClick: () => handleOnRemoveTag(tag)}, [
        "×"
      ])
    ])
  )
};

const tagsListReducer = (state, action) => {
  const { type, value } = action;
  let newState = [...state];
  if (type ===  'ADD_TAG' && value) {
    newState.push(value);
  } else if (type === 'REMOVE_TAG') {
    newState.splice(value, 1);
  } else if (type === 'SET_ALL_TAGS') {
    newState = [...value];
  }
  return newState
};

const TagsInput = ({
  tags, placeholder, onChange, tagClassName
}) => {
  const [tagsList, setTagsList] = React.useReducer(tagsListReducer, tags);
  const [tagInputValue, setTagInputValue] = React.useState('');
  const [backspacePressedCount, setBackspacePressedCount] = React.useState(0);
  const inputRef = React.useRef(null);

  const focusInputElement = () => {
    if (inputEl) {
      inputEl.current.focus();
    }
  };

  React.useEffect(() => {
    setTagsList({ type: 'SET_ALL_TAGS', value: tags});
  }, [tags]);

  React.useEffect(() => {
    if (onChange instanceof Function) {
      onChange(tagsList);
    }
  }, [tagsList]);

  const handleOnKeyDown = (event) => {
    const { key } = event;
    if (key === 'Enter' && tagsList.indexOf(tagInputValue) === -1) {
      setTagsList({ type: 'ADD_TAG', value: tagInputValue});
      setTagInputValue('');
      setBackspacePressedCount(0);
    } else if (key === 'Backspace') {
      if (backspacePressedCount === 1 && !tagInputValue) {
        setTagsList({ type: 'REMOVE_TAG', value: tagsList.length - 1});
        setTagInputValue('');
        setBackspacePressedCount(0);
      } else if (!tagInputValue && backspacePressedCount !== 1){
        setBackspacePressedCount(backspacePressedCount + 1);
      }
    }
  };

  const handleOnRemoveTag = (tag) => {
    const tagIndex = tagsList.findIndex(data => data === tag);
    setTagsList({ type: 'REMOVE_TAG', value: tagIndex });
  };

  return (
    React__default['default'].createElement('div', {
      className: "tags-input__contianer",
      onClick: focusInputElement,
      tagIndex: "0"
    }, [
      React__default['default'].createElement('div', {className: "tags__section"}, [
        tagsList.map((tag, index) => {
          const isLastIndex = (index === (tagsList.length - 1));
          return (
            TagItem({
              tag: tag,
              isLastIndex: isLastIndex,
              backspacePressedCount: backspacePressedCount,
              handleOnRemoveTag: handleOnRemoveTag,
              tagClassName: tagClassName}
            )
          )}
        ),
        React__default['default'].createElement('input', {
          type: "text",
          className: "tags__input__box",
          onKeyDown: handleOnKeyDown,
          onChange: (e) => setTagInputValue(e.target.value),
          name: "tagInput",
          value: tagInputValue,
          placeholder: placeholder,
          ref: inputRef}
        )
      ])
    ])
  )
};

TagsInput.defaultProps = {
  placeholder: 'Enter to add',
  tags: [],
  tagClassName: ''
};

exports.default = TagsInput;
//# sourceMappingURL=index.js.map

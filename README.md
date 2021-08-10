# taginput-react

Tags input component in react.

## How to Install

Make sure you have [Node.js](http://nodejs.org/) and NPM installed.

```sh
npm install taginput-react
```
Or
```sh
yarn add taginput-react
```

## How to Use

```sh
import React, { useState } from 'react'
import TagsInput from 'taginput-react'

const TagsInputDemo = () => {
  const [tags, setTags] = useState([])
  const handleOnChange = (data) => {
    setTags(data)
  }

  return (
    <TagsInput
      onChange={handleOnChange}
      placeholder="Enter to add"
    />
  )
}
```
## Demo
![Tag Input Demo](https://github.com/Santhosh1392/taginput-react/blob/main/demo/TagInput-demo.gif)

Check out [Online Demo](https://korimi.in/projects/taginput) here.

## Available Props

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| tags | array | [] | Initial Tags |
| placeholder | String | 'Enter to add' | Input placeholder |
| onChange | Function | null | Callback function to get the entered Tags by user |
| tagClassName | String | '' | Used to style tag element |

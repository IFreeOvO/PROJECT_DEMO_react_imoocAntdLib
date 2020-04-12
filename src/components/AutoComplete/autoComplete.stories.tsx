import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import AutoComplete from './autoComplete'

const simpleAutoComplete = () => {
  const mock = [
    'bradley',
    'pope',
    'caruso',
    'cook',
    'cousins',
    'james',
    'AD',
    'green',
    'howard',
    'kuzma',
    'McGee',
    'rando',
  ]
  const handleFetch = (query: string) => {
    return mock
      .filter((name) => name.includes(query))
  }

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      placeholder="输入湖人队球员英文名试试"
    ></AutoComplete>
  )
}

storiesOf('AutoComplete 组件', module).add('AutoComplete', simpleAutoComplete)

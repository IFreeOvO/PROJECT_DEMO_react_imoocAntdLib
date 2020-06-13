import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import AutoComplete, {DataSourceType} from './autoComplete'

interface mock2Props {
  value: string
  number: number
}

const simpleAutoComplete = () => {
  // const mock = [
  //   'bradley',
  //   'pope',
  //   'caruso',
  //   'cook',
  //   'cousins',
  //   'james',
  //   'AD',
  //   'green',
  //   'howard',
  //   'kuzma',
  //   'McGee',
  //   'rando',
  // ]

  // const mock2 = [
  //   {value: 'bradley', number: 11},
  //   {value: 'pope', number: 1},
  //   {value: 'caruso', number: 4},
  //   {value: 'cook', number: 2},
  //   {value: 'cousins', number: 15},
  //   {value: 'james', number: 23},
  //   {value: 'AD', number: 3},
  //   {value: 'green', number: 14},
  //   {value: 'howard', number: 39},
  //   {value: 'kuzma', number: 0},
  // ]

  // const handleFetch = (query: string) => {
  //   return mock
  //     .filter((name) => name.includes(query)).map(name => ({value:name}))
  // }

  // const handleFetch = (query: string) => {
  //   return mock2
  //     .filter((item) => item.value.includes(query))
  // }

  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`).then(res => res.json()).then(({items}) => {
      console.log(items);
      const formatItem = items.slice(0, 10).map((item: any) => ({value: item.login, ...item}))
      return formatItem
    })
  }

  const renderOption = (item: DataSourceType) => {
    const newItem = item as DataSourceType<mock2Props>
  return <h2>- {newItem.value} - {newItem.number}</h2>
  }

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      placeholder="输入湖人队球员英文名试试"
      renderOption={renderOption}
    ></AutoComplete>
  )
}

storiesOf('AutoComplete 组件', module).add('AutoComplete', simpleAutoComplete)

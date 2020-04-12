import React, {FC, ChangeEvent, useState} from 'react'
import Input, { InputProps } from '../Input/input'

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'>{
  /**返回输入建议的方法，可以拿到当前的输入 */
  fetchSuggestions: (query: string) => string[]
  /**点击选中建议项时触发的回调 */
  onSelect?: (item: string) => void
}

/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 * 
 * ~~~js
 * import { AutoComplete } from 'imooc'
 * ~~~
 */
export const AutoComplete: FC<AutoCompleteProps> = props => {
  const {fetchSuggestions, onSelect, value, ...restProps} = props
  const [ inputValue, setInputValue ] = useState(value)
  const [ suggestions, setSuggestions] = useState<string[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    console.log("handleChange -> value", value)
    if(value) {
      const result = fetchSuggestions(value) 
      setSuggestions(result)
    } else {
      setSuggestions([])
    }
  }

  const handleSelect = (item: string) => {
    setInputValue(item)
    setSuggestions([])
    if(onSelect) {
      onSelect(item)
    }
  }

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item,index) => {
          return <li key={index} onClick={() => handleSelect(item)}>
            {item}
          </li>
        })}
      </ul>
    )
  }

  return (
    <div className='auto-complete'>
      <Input {...restProps} onChange={handleChange} value={inputValue}></Input>
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete;
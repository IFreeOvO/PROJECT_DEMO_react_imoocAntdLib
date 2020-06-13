import React, {
  FC,
  ChangeEvent,
  ReactElement,
  useState,
  useEffect,
  KeyboardEvent,
  useRef,
} from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

interface DataSourceObject {
  value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**返回输入建议的方法，可以拿到当前的输入 */
  fetchSuggestions: (
    query: string
  ) => DataSourceType[] | Promise<DataSourceType[]>
  /**点击选中建议项时触发的回调 */
  onSelect?: (item: DataSourceType) => void
  /**支持自定义渲染下拉项 */
  renderOption?: (item: DataSourceType) => ReactElement
}

/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 *
 * ~~~js
 * import { AutoComplete } from 'imooc'
 * ~~~
 */
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props
  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const triggerSearch = useRef(false)
  const debouncedValue = useDebounce(inputValue, 500)
  const componentRef = useRef<HTMLDivElement>(null)

  useClickOutside(componentRef, () => {
    setSuggestions([])
  })

  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const result = fetchSuggestions(debouncedValue)
      if (result instanceof Promise) {
        setLoading(true)
        result.then((data) => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(result)
      }
    } else {
      setSuggestions([])
    }
  }, [debouncedValue, fetchSuggestions])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          const cnames = classNames('suggestion-item', {
            'is-active': index === highlightIndex,
          })
          return (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className={cnames}
            >
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }

  // 设置项目高亮
  const highlight = (index: number) => {
    if (index < 0) {
      index = 0
    }
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      // 回车
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        highlight(-1)
        break
      // 向上
      case 38:
        highlight(highlightIndex - 1)
        break
      // 向下
      case 40:
        highlight(highlightIndex + 1)
        break
      // esc
      case 27:
        setSuggestions([])
        highlight(-1)
        break
      default:
        break
    }
  }

  return (
    <div className="auto-complete" ref={componentRef}>
      <Input
        {...restProps}
        onChange={handleChange}
        value={inputValue}
        onKeyDown={handleKeyDown}
      ></Input>
      {loading && (
        <ul>
          <Icon icon="spinner" spin></Icon>
        </ul>
      )}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  )
}

export default AutoComplete

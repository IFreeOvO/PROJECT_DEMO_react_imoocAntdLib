import React, { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'

type InputSize = 'lg' | 'sm'

// Omit用来忽略InputHTMLAttributes里的size
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'>{
  /**设置 Input 的禁用 */
  disabled?: boolean
  /**设置 Input 的尺寸 */
  size?: InputSize
  /**设置 Input 的图标 */
  icon?: IconProp
  /**在 Input 之前放置元素 */
  prepend?: string | ReactElement
  /**在 Input 之后放置元素 */
  append?: string | ReactElement
  onChange? : (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 表单元素input
 * ### 引用方法
 * 
 * ~~~js
 * import { Input } from 'imooc'
 * ~~~
 */
export const Input: FC<InputProps> = props => {
  const {disabled, size, icon, prepend, append, className, style, ...restProps} = props
  const classes = classNames('input-wrapper', className, {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })

  // value没传值时默认为空字符串
  const fixControlledValue = (value: any) => {
    if(typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }

  // value和defaultValue不能同时存在
  if('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(restProps.value)
  }
  return (
    <div className={classes} style={style}>
      {prepend && <div className="in-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
      <input
        className="input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="in-input-group-append">{append}</div>}
    </div>
  )
}

export default Input;
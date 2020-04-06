import React, { ReactNode, FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'

// export enum ButtonSize {
//   'Large' = 'lg',
//   'Small' = 'sm'
// }

// export enum ButtonType {
//   'Default' = 'default',
//   'Primary' = 'primary',
//   'Danger' = 'danger',
//   'Link' = 'link'
// }

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  className?: string
  /**设置 Button 的禁用 */
  disabled?: boolean
  /**设置 Button 的尺寸 */
  size?: ButtonSize
  /**设置 Button 的类型 */
  btnType?: ButtonType
  children?: ReactNode
  href?: string
}

// React.ButtonHTMLAttributes<HTMLButtonElement> 拿到button所有原生属性
// NativeButtonProps 为原生属性和扩展属性的集合
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps> // Partial 可选属性

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 引用方法
 * 
 * ~~~js
 * import { Button } from 'imooc'
 * ~~~
 */
export const Button: FC<ButtonProps> = props => {
  const { className, disabled, size, btnType, children, href, ...restProps } = props

  const classes = classNames('btn', className,{
    [`btn-${size}`]: size,
    [`btn-${btnType}`]: btnType,
    'disabled': btnType === 'link' && disabled
  })

  if(btnType === 'link') {
    return (
      <a href={href} className={classes} {...restProps}>{children}</a>
    )
  } else {
    return (
      <button disabled={disabled} className={classes} {...restProps}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  btnType: 'default',
  disabled: false
}

export default Button

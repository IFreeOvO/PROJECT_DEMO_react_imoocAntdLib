import React, { ReactNode } from 'react'
import classNames from 'classnames'

export enum ButtonSize {
  'Large' = 'lg',
  'Small' = 'sm'
}

export enum ButtonType {
  'Default' = 'default',
  'Primary' = 'primary',
  'Danger' = 'danger',
  'Link' = 'link'
}

interface BaseButtonProps {
  className?: string
  disabled?: boolean
  size?: ButtonSize
  btnType?: ButtonType
  children?: ReactNode
  href?: string
}

// React.ButtonHTMLAttributes<HTMLButtonElement> 拿到button所有原生属性
// NativeButtonProps 为原生属性和扩展属性的集合
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps> // Partial 可选属性

const Button: React.FC<ButtonProps> = props => {
  const { className, disabled, size, btnType, children, href, ...restProps } = props

  const classes = classNames('btn', className,{
    [`btn-${size}`]: size,
    [`btn-${btnType}`]: btnType,
    'disabled': btnType === ButtonType.Link && disabled
  })

  if(btnType === ButtonType.Link) {
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
  btnType: ButtonType.Default,
  disabled: false
}

export default Button

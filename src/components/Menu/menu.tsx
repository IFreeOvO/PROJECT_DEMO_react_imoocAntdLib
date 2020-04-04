import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import {MenuItemProps} from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void

export interface MenuProps {
  defaultIndex?: string
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: SelectCallback
  defaultOpenSubMenus?: string[]
}

interface IMenuContext {
  index: string
  onSelect?: SelectCallback
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

const Menu: React.FC<MenuProps> = props => {
  const { defaultIndex, className, mode, style, onSelect, children, defaultOpenSubMenus } = props
  const [currentActivity, setActivity] = useState(defaultIndex)
  const classes = classNames('menu', className, {
    [`menu-${mode}`]: mode
  })

  const handleClick = (index:string) => {
    setActivity(index)
    if(onSelect) {
      onSelect(index)
    }
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if(displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.error('warning: Menu has a child which is not a MenuItem component')
      }
    })
  }

  const passedContext: IMenuContext = {
    index: currentActivity ? currentActivity : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }

  return (
    <ul className={classes} style={style} data-testid='test-menu'>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}

export default Menu

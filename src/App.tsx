import React from 'react';
import Button, {ButtonSize, ButtonType} from './components/Button/button'
import Alert from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'

function App() {
  return (
    <div className="App" style={{padding: 40}}>
      <Button className='custom' >默认按钮</Button>
      <Button disabled>禁用</Button>
      <Button size={ButtonSize.Large} btnType={ButtonType.Primary}>大按钮</Button>
      <Button size={ButtonSize.Small} btnType={ButtonType.Primary}>小按钮</Button>
      <Button btnType={ButtonType.Link} target='_blank' href='https://www.baidu.com/'>按钮链接</Button>
      <Button btnType={ButtonType.Link} href='https://www.baidu.com/' disabled>禁用按钮链接</Button>


      <div style={{marginTop: 20, width: 400}}>
        <Alert closable onClose={(e) => alert(e)}></Alert>
        <hr/>
        <Alert type='success' closable description='成功'></Alert>
        <hr/>
        <Alert type='danger' closable description='失败'></Alert>
        <hr/>
        <Alert type='warning' description='警告'></Alert>
        <hr/>
        <Alert closable title='标题' description='自定义描述'></Alert>
      </div>

      <div style={{marginTop: 20, width: 400}}>
        <Menu defaultIndex={0} onSelect={(index)=>{alert(index)}}>
          <MenuItem>link 1</MenuItem>
          <MenuItem disabled>link 2</MenuItem>
          <MenuItem>link 3</MenuItem>
        </Menu>
        <hr/>
        <Menu mode='vertical' defaultIndex={0} onSelect={(index)=>{alert(index)}}>
          <MenuItem>link 1</MenuItem>
          <MenuItem  disabled>link 2</MenuItem>
          <MenuItem>link 3</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default App;
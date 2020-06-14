import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Upload from './upload'
import { UploadFile } from './upload'
import Dragger from './dragger'
import Icon from '../Icon/icon'

const defaultFileList: UploadFile[] = [
  {
    uid: '123',
    size: 1234,
    name: 'hello.md',
    status: 'uploading',
    percent: 30,
  },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 },
]

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 5000) {
    alert('文件大于50k')
    return false
  } else {
    return true
  }
}

const simpleUpload = () => {
  return (
    <Upload
      action="https://jsonplaceholder.typicode.com/posts"
      beforeUpload={checkFileSize}
      onProgress={action('process')}
      onSuccess={action('success')}
      onError={action('error')}
      onChange={action('change')}
      defaultFileList={defaultFileList}
      name="filename"
      data={{ demo: 'test' }}
      headers={{ 'X-Powered-By': 'demo' }}
      accept=".png"
      multiple
    ></Upload>
  )
}

const dragUpload = () => {
  return (
    <Upload
      action="https://jsonplaceholder.typicode.com/posts"
      beforeUpload={checkFileSize}
      onProgress={action('process')}
      onSuccess={action('success')}
      onError={action('error')}
      onChange={action('change')}
      drag
    >
      <Icon icon='upload' size='5x' theme='secondary'></Icon>
      <br/>
      <p>Drag file over to upload</p>
    </Upload>
  )
}

storiesOf('第十章 upload组件', module)
  .add('Upload', simpleUpload)
  .add('拖拽上传', dragUpload)

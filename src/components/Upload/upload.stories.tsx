import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions';
import Upload from './upload'

const checkFileSize = (file: File) => {
  if(Math.round(file.size / 1024) > 50) {
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
    ></Upload>
  )
}

storiesOf('第十章 upload组件', module).add('Upload', simpleUpload)
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions';
import Upload from './upload'

const simpleUpload = () => {
  return (
    <Upload
      action="https://jsonplaceholder.typicode.com/posts"
      onProgress={action('process')}
      onSuccess={action('success')}
      onError={action('error')}
    ></Upload>
  )
}

storiesOf('第十章 upload组件', module).add('Upload', simpleUpload)
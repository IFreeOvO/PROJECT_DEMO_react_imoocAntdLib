import React, { FC, ChangeEvent, useRef } from 'react'
import axios from 'axios'
import Button from '../Button/button'

export interface UploadProps {
  action: string
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  name?: string
}

/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { upload } from 'imooc'
 * ~~~
 */
export const Upload: FC<UploadProps> = (props) => {
  const { action, onProgress, onSuccess, onError, name } = props
  const fileInput = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFile(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const uploadFile = (files: FileList) => {
    let postFile = Array.from(files)
    console.log("uploadFile -> postFile", postFile)

    postFile.forEach((file) => {
      const formData = new FormData()
      formData.append(file.name, file)
      axios
        .post(action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (e) => {
            console.log('onProgress -> e', e)
            let percentage = Math.round((e.loaded * 100) / e.total) || 0
            if (onProgress) {
              onProgress(percentage, file)
            }
          },
        })
        .then((res) => {
          console.log('onSuccess -> res', res)
          if (onSuccess) {
            onSuccess(res, file)
          }
        })
        .catch((err) => {
          console.log('uploadFile -> err', err)
          if (onError) {
            onError(err, file)
          }
        })
    })
  }

  return (
    <div className="upload-component">
      <Button btnType="primary" onClick={handleClick}>
        上传文件
      </Button>
      <input
        className="file-input"
        style={{ display: 'none' }}
        type="file"
        name={name}
        ref={fileInput}
        onChange={handleFileChange}
      />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file',
}

export default Upload

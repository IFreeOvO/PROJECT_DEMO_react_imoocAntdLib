import React, { FC, ChangeEvent, useRef, useState } from 'react'
import axios from 'axios'
import Button from '../Button/button'
import UploadList from './uploadList'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent?: number
  raw?: File
  response?: any
  error?: any
}
export interface UploadProps {
  action: string
  defaultFileList?: UploadFile[]
  beforeUpload?: (file: File) => Boolean | Promise<File>
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  onChange?: (file: File) => void
  onRemove?: (file: UploadFile) => void
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
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    name,
  } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      console.log('post -> _file', fileList)
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }

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
    // console.log('uploadFile -> postFile', postFile)

    postFile.forEach((file) => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        // console.log("beforeUpload -> result", result)
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }

  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    }

    // 同步更新文件列表
    // setFileList([_file, ...fileList])
    setFileList((prevList) => {
      return [_file, ...prevList]
    })
    console.log('post -> fileList', fileList)

    const formData = new FormData()
    formData.append(file.name, file)
    axios
      .post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          // console.log('onProgress -> e', e)

          let percentage = Math.round((e.loaded * 100) / e.total) || 0
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: 'uploading' })
            if (onProgress) {
              onProgress(percentage, file)
            }
          }
        },
      })
      .then((res) => {
        // console.log('onSuccess -> res', res)
        updateFileList(_file, { status: 'success', response: res.data })
        if (onSuccess) {
          onSuccess(res, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
      .catch((err) => {
        // console.log('uploadFile -> err', err)
        updateFileList(_file, { status: 'error', error: err })
        if (onError) {
          onError(err, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
  }

  const handleRemove = (file: UploadFile) => {
    setFileList((preList) => {
      return preList.filter(item => item.uid !== file.uid)
    })
    if(onRemove) {
      onRemove(file)
    }
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
      <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
    </div>
  )
}

Upload.defaultProps = {
  name: 'file',
}

export default Upload

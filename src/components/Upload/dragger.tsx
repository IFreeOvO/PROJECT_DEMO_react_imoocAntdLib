import React, { FC, useState, DragEvent } from 'react'
import classNames from 'classnames'

interface DraggerProps {
  onFile: (files: FileList) => void
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props
  const [dragOver, setDragOver] = useState(false)
  const klass = classNames('uploader-dragger', {
    'is-dragover': dragOver,
  })

  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    console.log("handleDrag -> e", e)
    e.preventDefault()
    setDragOver(over)
  }

  const handleDrop = (e:DragEvent<HTMLElement>) => {
    console.log("handleDrag -> e", e)
    e.preventDefault()
    setDragOver(false)
    onFile(e.dataTransfer.files)
  }

  return (
    <div
      className={klass}
      onDragOver={(e) => {
        handleDrag(e, true)
      }}
      onDragLeave={(e) => {
        handleDrag(e, false)
      }}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default Dragger

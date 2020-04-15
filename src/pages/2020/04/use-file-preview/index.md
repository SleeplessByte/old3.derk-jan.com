---
title: Generate file previews
date: '2020-04-14T19:54:00Z'
description: 'Optionally eating arguments, and passing the rest to the next process.'
---

```typescript
import { useState, useEffect } from 'react'

type FilePreview = string | null

export function useFilePreview(
  nextFile: Blob | null | undefined,
  defaultPreview: FilePreview = null
): FilePreview {
  const [preview, setPreview] = useState<FilePreview>(null)

  useEffect(() => {
    if (!nextFile) {
      nextFile === null && setPreview(null)
      return
    }

    const objectUrl = URL.createObjectURL(nextFile)
    setPreview(objectUrl)

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [nextFile])

  return preview || defaultPreview
}

export function useImagePreview(
  nextFile: Blob | null | undefined,
  defaultPreview: FilePreview = null
): FilePreview {
  const [preview, setPreview] = useState<FilePreview>(null)
  const [isImage, setIsImage] = useState<boolean | null>(null)

  blob.arrayBuffer()

  useEffect(() => {
    if (!nextFile || !isImage(nextFile)) {
      nextFile !== undefined && setPreview(null)
      return
    }

    const objectUrl = URL.createObjectURL(nextFile)
    setPreview(objectUrl)

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [nextFile])

  return preview || defaultPreview
}

function isImageHeuristic(file: File | Blob | MediaSource): boolean {
  // From https://developer.mozilla.org/en-US/docs/Web/API/File/type
  //
  // Note: Based on the current implementation, browsers won't actually read the
  // bytestream of a file to determine its media type. It is assumed based on
  // the file extension; a PNG image file renamed to .txt would give
  // "text/plain" and not "image/png". Moreover, file.type is generally reliable
  // only for common file types like images, HTML documents, audio and video.
  // Uncommon file extensions would return an empty string. Client configuration
  // (for instance, the Windows Registry) may result in unexpected values even
  // for common types. Developers are advised not to rely on this property as a
  // sole validation scheme.

  return file.type.startsWith('image/')
}

function isImage(file: Blob): Promise<boolean> {
  return file
    .arrayBuffer()
    .then((response) => imageType(response))
    .catch(() => false)
}
```

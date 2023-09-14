import { FileVideo, Upload } from 'lucide-react'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react'

export function VideoInputForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const videoTagsInputRef = useRef<HTMLTextAreaElement>(null)

  function handleVideoFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget
    if (!files) return
    const selectedFile = files[0]
    setVideoFile(selectedFile)
  }

  const previewURL = useMemo(() => {
    if (!videoFile) return null
    return URL.createObjectURL(videoFile)
  }, [videoFile])

  function handleVideoUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const videoTags = videoTagsInputRef.current?.value

    if (!videoFile) return

    // convert video in audio
  }

  return (
    <form onSubmit={handleVideoUpload} className="space-y-6">
      <Label
        htmlFor="video"
        className="relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
      >
        {previewURL ? (
          <video
            src={`${previewURL}#t=2`}
            controls={false}
            className="pointer-events-none absolute inset-0"
          />
        ) : (
          <>
            <FileVideo className="w-4 h-4" />
            Select a video
          </>
        )}
      </Label>
      <input
        className="sr-only"
        type="file"
        id="video"
        accept="video/mp4"
        onChange={handleVideoFileSelected}
      />
      <Separator />
      <div className="space-y-2">
        <Label htmlFor="transcription-prompt">Video tags</Label>
        <Textarea
          ref={videoTagsInputRef}
          placeholder="Insert tags mentioned on selected video separated by comma (,)"
          id="transcription-prompt"
          className="h-20 leading-relaxed"
        />
      </div>
      <Button type="submit" className="w-full">
        Upload video
        <Upload className="w-4 h-4 ml-2" />
      </Button>
    </form>
  )
}

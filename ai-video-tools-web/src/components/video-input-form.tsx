import { FileVideo, Upload } from 'lucide-react'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react'
import { loadFFmpeg } from '@/lib/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import { FileData } from 'node_modules/@ffmpeg/ffmpeg/dist/esm/types'
import { api } from '@/lib/axios'
import { UserAlert } from './user-alert'

type Status = 'waiting' | 'converting' | 'uploading' | 'generating' | 'success'

const statusButtonMessages = {
  converting: 'Converting...',
  uploading: 'Uploading...',
  generating: 'Preparing...',
  success: 'Success!',
}

interface VideoInputFormProps {
  onVideoUploaded: (id: string) => void
}

let userAlertTitle: string
let userAlertMessage: string
let userAlertActionText: string

export function VideoInputForm(props: VideoInputFormProps) {
  const [openUserAlert, setOpenUserAlert] = useState<boolean>(false)
  const [status, setStatus] = useState<Status>('waiting')
  const [videoFile, setVideoFile] = useState<File | null>(null)

  const videoTagsInputRef = useRef<HTMLTextAreaElement>(null)

  const previewURL = useMemo(() => {
    if (!videoFile) return null
    return URL.createObjectURL(videoFile)
  }, [videoFile])

  function handleVideoFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget
    if (!files) return
    const selectedFile = files[0]
    setVideoFile(selectedFile)
  }

  function convertFileDataToFile(input: FileData) {
    const fileDataBlob = new Blob([input], { type: 'audio/mpeg' })
    const output = new File([fileDataBlob], 'output.mp3', {
      type: 'audio/mpeg',
    })
    return output
  }

  async function convertVideoToAudio(video: File) {
    const ffmpeg = await loadFFmpeg()
    await ffmpeg.writeFile('input.mp4', await fetchFile(video))
    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      'output.mp3',
    ])

    const audioFileData = await ffmpeg.readFile('output.mp3')
    const audioFile = convertFileDataToFile(audioFileData)

    return audioFile
  }

  function handleOpenUserAlert(
    title: string,
    message: string,
    actionText: string,
  ) {
    userAlertTitle = title
    userAlertMessage = message
    userAlertActionText = actionText
    setOpenUserAlert(true)
  }

  function handleUserAlertClose() {
    setOpenUserAlert(false)
  }

  function createUploadAudioFileData(audioFile: File) {
    const data = new FormData()
    data.append('file', audioFile)
    return data
  }

  async function handleVideoUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const videoTags = videoTagsInputRef.current?.value

    if (!videoFile) {
      setStatus('waiting')
      return
    }

    setStatus('converting')

    const convertedAudioFile = await convertVideoToAudio(videoFile)

    if (!convertedAudioFile) {
      setStatus('waiting')
      handleOpenUserAlert(
        'Conversion error!',
        'Please contact the system administrator.',
        'Ok',
      )
      return
    }

    setStatus('uploading')

    const response = await api
      .post('/videos', createUploadAudioFileData(convertedAudioFile))
      .catch((error) => {
        setStatus('waiting')
        handleOpenUserAlert(
          'Video upload error!',
          `Please contact the system administrator: ${error.response.data.message}`,
          'Ok',
        )
      })

    if (!response) return

    setStatus('generating')

    await api
      .post(`/videos/${response.data.video.id}/transcription`, {
        prompt: videoTags,
      })
      .then(() => {
        setStatus('success')
        props.onVideoUploaded(response.data.video.id)
      })
      .catch((error) => {
        setStatus('waiting')
        handleOpenUserAlert(
          'Video transcription error!',
          `Please contact the system administrator: ${error.response.data.message}`,
          'Ok',
        )
      })
  }

  return (
    <>
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
          <Label htmlFor="transcription-prompt">Video keywords</Label>
          <Textarea
            disabled={status !== 'waiting'}
            ref={videoTagsInputRef}
            placeholder="Insert keywords mentioned on selected video separated by comma (,)"
            id="transcription-prompt"
            className="h-20 leading-relaxed"
          />
        </div>
        <Button
          data-success={status === 'success'}
          disabled={status !== 'waiting'}
          type="submit"
          className="w-full data-[success=true]:bg-emerald-500"
        >
          {status === 'waiting' ? (
            <>
              Upload video
              <Upload className="w-4 h-4 ml-2" />
            </>
          ) : (
            statusButtonMessages[status]
          )}
        </Button>
      </form>
      <UserAlert
        onClose={handleUserAlertClose}
        openTrigger={openUserAlert}
        title={userAlertTitle}
        message={userAlertMessage}
        actionText={userAlertActionText}
      />
    </>
  )
}

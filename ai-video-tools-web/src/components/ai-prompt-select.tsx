import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { api } from '@/lib/axios'
import { Label } from './ui/label'
import { UserAlert } from './user-alert'

export interface Prompt {
  id: string
  title: string
  template: string
}

interface AIPromptSelectionProps {
  onAIPromptSelected: (Prompt: Prompt) => void
}

let userAlertTitle: string
let userAlertMessage: string
let userAlertActionText: string

export function AIPromptSelect(props: AIPromptSelectionProps) {
  const [openUserAlert, setOpenUserAlert] = useState<boolean>(false)
  const [prompts, setPrompts] = useState<Array<Prompt> | null>(null)

  useEffect(() => {
    api
      .get('/prompts')
      .then((response) => {
        setPrompts(response.data)
      })
      .catch((error) => {
        handleOpenUserAlert(
          'Error!',
          `It is not possible to load the prompt selection. Please contact the system administrator: ${error.message}`,
          'Ok',
        )
      })
  }, [])

  function handleAIPromptSelected(promptId: string) {
    const selectedAIPrompt = prompts?.find((prompt) => prompt.id === promptId)
    if (!selectedAIPrompt) return
    props.onAIPromptSelected(selectedAIPrompt)
  }

  function handleUserAlertClose() {
    setOpenUserAlert(false)
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

  return (
    <>
      <Label>Prompt</Label>
      <Select onValueChange={handleAIPromptSelected}>
        <SelectTrigger>
          <SelectValue placeholder="Select a prompt" />
        </SelectTrigger>
        <SelectContent>
          {prompts?.map((prompt) => {
            return (
              <SelectItem key={prompt.id} value={prompt.id}>
                {prompt.title}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
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

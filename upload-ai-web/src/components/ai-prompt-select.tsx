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

export interface Prompt {
  id: string
  title: string
  template: string
}

interface AIPromptSelectionProps {
  onAIPromptSelected: (Prompt: Prompt) => void
}

export function AIPromptSelect(props: AIPromptSelectionProps) {
  const [prompts, setPrompts] = useState<Array<Prompt> | null>(null)

  useEffect(() => {
    api.get('/prompts').then((response) => {
      setPrompts(response.data)
    })
  }, [])

  function handleAIPromptSelected(promptId: string) {
    const selectedAIPrompt = prompts?.find((prompt) => prompt.id === promptId)
    if (!selectedAIPrompt) return
    props.onAIPromptSelected(selectedAIPrompt)
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
    </>
  )
}

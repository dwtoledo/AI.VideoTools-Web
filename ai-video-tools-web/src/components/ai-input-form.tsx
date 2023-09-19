import { Wand2 } from 'lucide-react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { AIPromptSelect, Prompt } from './ai-prompt-select'
import { AIModelSelect } from './ai-model-select'
import { AITemperatureSlide } from './ai-temperature-slide'
import { FormEvent } from 'react'

interface AIInputFormProps {
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void
  onAIPromptSelected: (template: string) => void
  onAITemperatureChange: (temperature: number) => void
  isLoading: boolean
}

export function AIInputForm(props: AIInputFormProps) {
  function handleAIPromptSelected(prompt: Prompt) {
    props.onAIPromptSelected(prompt.template)
  }

  function handleAITemperatureSlider(temperature: number) {
    props.onAITemperatureChange(temperature)
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    props.onFormSubmit(event)
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div className="space-y-2">
        <AIPromptSelect onAIPromptSelected={handleAIPromptSelected} />
      </div>
      <div className="space-y-2">
        <AIModelSelect />
      </div>
      <Separator />
      <div className="space-y-4">
        <AITemperatureSlide onAITemperatureSlider={handleAITemperatureSlider} />
      </div>
      <Separator />
      <Button disabled={props.isLoading} type="submit" className="w-full">
        Generate
        <Wand2 className="w-4 h-4 ml-2" />
      </Button>
    </form>
  )
}

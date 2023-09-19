import { useState } from 'react'
import { Label } from './ui/label'
import { Slider } from './ui/slider'

export const INITIAL_AI_TEMPERATURE = 0.5

interface AITemperatureSlideProps {
  onAITemperatureSlider: (value: number) => void
}

export function AITemperatureSlide(props: AITemperatureSlideProps) {
  const [temperature, setTemperature] = useState(INITIAL_AI_TEMPERATURE)

  function handleAITemperatureSlider(values: Array<number>) {
    setTemperature(values[0])
    props.onAITemperatureSlider(values[0])
  }

  return (
    <>
      <Label>AI Creativity</Label>
      <Slider
        min={0}
        max={1}
        step={0.1}
        value={[temperature]}
        onValueChange={(values) => handleAITemperatureSlider(values)}
      />
      <p className="text-xs text-muted-foreground italic leading-relaxed">
        When values are high, the results tend to be more imaginative, although
        potential errors may occur.
      </p>
    </>
  )
}

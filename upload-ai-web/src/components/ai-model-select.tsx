import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export function AIModelSelect() {
  return (
    <>
      <Label>Model</Label>
      <Select defaultValue="gpt35" disabled>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gpt35">GPT 3.5-turbo 16k</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground italic">
        New options available soon!
      </p>
    </>
  )
}

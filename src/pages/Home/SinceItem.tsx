import ToolMetaItem from './ToolMetaItem.tsx'

interface Props {
  since: string
}
export default function SinceItem({ since }: Props) {
  return <ToolMetaItem label="Since" value={since} />
}

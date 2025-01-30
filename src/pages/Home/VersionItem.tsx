import ToolMetaItem from './ToolMetaItem.tsx'

interface Props {
  version: string
}
export default function VersionItem({ version }: Props) {
  return <ToolMetaItem label="Version" value={version} />
}

import DetailSiderLayout from '@higanbina/components/DetailSider/DetailSiderLayout.tsx'
import ManeuverImportButton from './ManeuverImportButton.tsx'
import SelectedManeuversElm from './SelectedManeuversElm.tsx'

export default function ManeuverDetailSider() {
  return (
    <DetailSiderLayout
      width={336}
      minMainContentsWidth={789}
      actions={<ManeuverImportButton />}
    >
      <SelectedManeuversElm />
    </DetailSiderLayout>
  )
}

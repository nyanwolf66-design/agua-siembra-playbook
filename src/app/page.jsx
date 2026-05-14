import { getAllSections, PARTS } from '@/lib/content'
import PlaybookApp from '@/components/PlaybookApp'

export default function Page() {
  const sections = getAllSections()
  return <PlaybookApp sections={sections} parts={PARTS} />
}

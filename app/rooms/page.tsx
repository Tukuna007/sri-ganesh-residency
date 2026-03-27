import RoomsContent from '@/components/rooms-content'
import { ROOMS } from '@/lib/constants'
import { constructMetadata } from '@/lib/seo/metadata'
import LayoutWrapper from '../layout-wrapper'
import { getDictionary } from '@/lib/i18n/get-dictionary'

export const metadata = constructMetadata({
  title: 'Our Rooms',
  description: 'Explore our range of luxury accommodations at Sri Ganesh Residency.',
})

export default async function RoomsPage() {
  const dictionary = await getDictionary('en')
  return (
    <LayoutWrapper>
      <RoomsContent rooms={ROOMS} dictionary={dictionary} />
    </LayoutWrapper>
  )
}

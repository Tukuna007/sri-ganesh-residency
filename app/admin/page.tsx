import LayoutWrapper from '../layout-wrapper'
import { constructMetadata } from '@/lib/seo/metadata'
import AdminDashboard from '@/components/admin-dashboard'

export const metadata = constructMetadata({
  title: 'Admin Dashboard',
  noIndex: true,
})

export default function AdminPage() {
  return (
    <LayoutWrapper>
      <AdminDashboard />
    </LayoutWrapper>
  )
}

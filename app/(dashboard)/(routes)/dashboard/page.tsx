import { UserButton } from '@clerk/nextjs'

const DashboardPage = () => {
  return (
    <div>
      <p></p>
      <UserButton afterSignOutUrl='/'/>
    </div>
  )
}

export default DashboardPage

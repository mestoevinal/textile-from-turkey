import { BrowserRouter } from 'react-router-dom'
import { AppSidebar } from './sidebar/sidebar'

export function App() {
  return (
    <BrowserRouter>
      <div>
        <AppSidebar />
      </div>
    </BrowserRouter>
  )
}

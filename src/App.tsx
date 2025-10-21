import { BrowserRouter } from 'react-router-dom'
import { AppSidebar } from './sidebar/sidebar'

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen xl:flex">
        <div>
          <AppSidebar />
        </div>
      </div>
    </BrowserRouter>
    
  )
}

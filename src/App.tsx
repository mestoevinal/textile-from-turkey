/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter } from 'react-router-dom'
import { AppSidebar } from './sidebar/sidebar'
import { PageRenderer } from './pages/Renderer'
import { clientData, clientPage } from './stubbed-data/client'

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex bg-gray-50">
        {/* Sidebar - фиксированная слева */}
        <AppSidebar />
        
        {/* Main content - справа от сайдбара */}
        <main className="flex-1 lg:ml-64 p-4 lg:p-6">
          <PageRenderer config={clientPage as any} data={clientData}/> 
        </main>
      </div>
    </BrowserRouter>
  )
}
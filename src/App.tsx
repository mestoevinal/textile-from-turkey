/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppSidebar } from './sidebar/sidebar'
import { PageRenderer } from './pages/Renderer'
import { clientData, clientPage, productData, productPage } from './stubbed-data/client'
import { useEffect } from 'react';

export function App() {
  
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
    }
  }, []);

  return (
    <BrowserRouter>
        <div className="min-h-screen flex bg-gray-50">
          <AppSidebar />
          <main className="flex-1 lg:ml-64 p-4 lg:p-6">
            <Routes>
              <Route path="/client" element={ <PageRenderer config={clientPage as any} data={clientData}/> } />
              <Route path="/products" element={ <PageRenderer config={productPage as any} data={productData}/>  } />
            </Routes>
          </main>
        </div>
    </BrowserRouter>
  )
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageRenderer } from './pages/Renderer'
import { clientData, clientPage } from './stubData/test'
import '../index.css'

export function App() {
  return <PageRenderer config={clientPage as unknown as any} data={clientData} />
}

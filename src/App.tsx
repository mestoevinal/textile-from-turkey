/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Papa from 'papaparse';

const SHEET_ID = '1FjeC0gX-2rDkh0SX-0EVPBhCKf2Sgt3Rzw8EzE3sMc8';
const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

async function fetchProducts() {
  const response = await fetch(url);
  const text = await response.text();
  
  const { data } = Papa.parse(text, { header: true });
  return data;
}
export function App() {
  
  const [products, setProducts] = useState([]);
  console.log('🚀 ~ App ~ products:', products)

  useEffect(() => {
    fetchProducts().then(data => setProducts(data as any));
  }, []);

  return (
    <BrowserRouter>
        <div className="min-h-screen flex bg-gray-50">
          <main className="flex-1 lg:ml-64 p-4 lg:p-6">
            {/* <img src="https://lh3.googleusercontent.com/d/187pF-JQk9j-2kYsF4cj96_CnXr0N_DqM" alt="test" /> */}
            <Routes>
              {/* <Route path="/client" element={ <PageRenderer config={clientPage as any} data={clientData}/> } />
              <Route path="/products" element={ <PageRenderer config={productPage as any} data={productData}/>  } /> */}
            </Routes>
          </main>
        </div>
    </BrowserRouter>
  )
}
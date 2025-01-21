import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from './Router/Router';
import { ToastContainer } from 'react-toastify';
import Authentication from './Authentication/Authentication';
import { HelmetProvider } from 'react-helmet-async';
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from '@tanstack/react-query'

const queryClient = new QueryClient();



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authentication>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
          <ToastContainer position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true} />
        </QueryClientProvider>
      </HelmetProvider>
    </Authentication>

  </StrictMode>,
)

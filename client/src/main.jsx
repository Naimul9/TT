import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import './index.css'
import { router } from './Routes/router';

import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>

       <HelmetProvider>
    <RouterProvider router={router} /> 
    </HelmetProvider>
    
    <Toaster/>
    </StrictMode>,
)

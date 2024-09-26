import { createRoot } from 'react-dom/client'
import './index.scss'
import { RouterProvider } from 'react-router-dom';
import router from './router';

import store from './store';
import { Provider } from 'react-redux';
import 'normalize.css'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
    </Provider>
)

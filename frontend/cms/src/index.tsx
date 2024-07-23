import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './pages/login';
import ErrorPage from './error-page';
import Signup from './pages/signup';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />
	},
	{
		path: "/signup",
		element: <Signup/>,
		errorElement: <ErrorPage />
	},
	{
		path: "login",
		element: <Login/>,
		errorElement: <ErrorPage />
	}
])
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

// logging reports
// disable in prod
reportWebVitals(console.log);

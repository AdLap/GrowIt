import './App.scss'
import Home from './home/Home'
import { Profile } from './profile/profile'
import { Gallery } from './gallery/gallery'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'

function NotFound() {
	return (
		<>
			<h1>Strona nie istnieje</h1>
			<Link to='/'>Home</Link>
		</>
	)
}

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/profile/:plantId' element={<Profile />} />
				<Route path='/gallery' element={<Gallery />} />
				<Route element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App

import React, { useEffect } from 'react'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Home from './app/home/components/Home'
import Profile from './app/plants/components/profile/Profile'
import { Gallery } from './app/gallery/components/gallery'
import { getPlants } from './app/plants/duck/operations'

function NotFound() {
	return (
		<>
			<h1>Strona nie istnieje</h1>
			<Link to='/'>Home</Link>
		</>
	)
}

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getPlants())
	}, [dispatch])

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

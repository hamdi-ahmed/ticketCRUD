import { Routes, Route } from 'react-router-dom'
import BuyTicket from './views/BuyTicket'
import EditTicket from './views/EditTicket'
import Home from './views/Home'

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />}></Route>
			<Route path="/buyTicket" element={<BuyTicket />}></Route>
			<Route path="/editTicket/:id" element={<EditTicket />}></Route>
		</Routes>
	)
}

export default App

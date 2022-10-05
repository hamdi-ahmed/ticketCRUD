import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import { useActions } from '../hooks/useActions'
import { useNavigate } from 'react-router-dom'
const BuyTicket = () => {
	// ** Router
	const navigate = useNavigate()
	// ** States
	const [dataModel, setDataModel] = useState({
		name: '',
		price: 0,
		startDate: '',
		endDate: '',
		Description: ''
	})
	const [error, setError] = useState('')

	// ** Destruct
	const { name, price, startDate, endDate, Description } = dataModel
	const { addTicket, getTickets } = useActions()

	const handleInputsChange = (e: React.FormEvent<EventTarget>): void => {
		let target = e.target as HTMLInputElement
		setDataModel({ ...dataModel, [target.name]: target.value })
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!name || !price || !startDate || !endDate || !Description) {
			setError('please, fill all inputs')
		} else {
			addTicket(dataModel)
			navigate('/')
			setError('')
		}
	}
	return (
		<div>
			<div style={{ textAlign: 'center' }}>
				{error && (
					<h3
						style={{
							color: '#FFF',
							background: 'red',
							width: '50%',
							margin: 'auto',
							marginTop: '10px'
						}}
					>
						{error}
					</h3>
				)}
				<h2>Add Ticket</h2>
			</div>
			<Box
				component="form"
				sx={{
					'& .MuiTextField-root': { m: 1, width: '50ch' }
				}}
				noValidate
				onSubmit={(e) => handleSubmit(e)}
				autoComplete="off"
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<TextField
						id="Name"
						label="Name"
						name="name"
						value={name}
						type="text"
						onChange={handleInputsChange}
					/>
					<br />
					<TextField
						id="Price"
						label="Price"
						name="price"
						value={price}
						type="number"
						onChange={handleInputsChange}
					/>
					<br />
					<TextField
						id="Description"
						label="Description"
						name="Description"
						value={Description}
						type="text"
						onChange={handleInputsChange}
					/>
					<br />
					<TextField
						id="StartDate"
						// label="Start Date"
						name="startDate"
						value={startDate}
						type="date"
						onChange={handleInputsChange}
					/>
					<br />
					<TextField
						id="EndDate"
						name="endDate"
						value={endDate}
						type="date"
						onChange={handleInputsChange}
					/>
					<br />
					<Button type="submit" color="primary">
						Add Ticket
					</Button>
				</div>
			</Box>
		</div>
	)
}

export default BuyTicket

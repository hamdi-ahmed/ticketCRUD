import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import { useActions } from '../hooks/useActions'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

interface State {
	tickets: {
		loading: boolean
		ticket: any
		error: string
	}
}

const EditTicket = () => {
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
	const state = useSelector((state: State) => state)
	// console.log(state.tickets.ticket);
	const s = state.tickets.ticket
	// ** Destruct
	const { name, price, startDate, endDate, Description } = dataModel
	const { getSingleTicket, updateTicketServer } = useActions()
	const params = useParams()
	let id: string | undefined
	id = params.id

	const handleInputsChange = (e: React.FormEvent<EventTarget>): void => {
		let target = e.target as HTMLInputElement
		setDataModel({ ...dataModel, [target.name]: target.value })
	}

	useEffect(() => {
		if (id) {
			getSingleTicket(id)
		}
	}, [])

	useEffect(() => {
		if (s) {
			setDataModel({
				name: s.name,
				price: s.price,
				startDate: s.startDate,
				endDate: s.endDate,
				Description: s.Description
			})
		}
	}, [s])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!name || !price || !startDate || !endDate || !Description) {
			setError('please, fill all inputs')
		} else {
			if (id) {
				updateTicketServer(dataModel, id)
				navigate('/')
				setError('')
			}
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
						Update Ticket
					</Button>
				</div>
			</Box>
		</div>
	)
}

export default EditTicket

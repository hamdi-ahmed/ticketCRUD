import React, { useEffect, useState, useRef } from 'react'

import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useActions } from '../hooks/useActions'
import { useSelector } from 'react-redux'
import Spinner from '../components/spinner/Spinner'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { useNavigate } from 'react-router-dom'
import Dialog from '../components/dialog/Dialog'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14
	}
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0
	}
}))

function createData(
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number
) {
	return { name, calories, fat, carbs, protein }
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9)
]

interface State {
	tickets: {
		loading: boolean
		tickets: any[]
		error: string
	}
}

const Home = () => {
	// ** Dialog
	const index = useRef(0)
	const [dialog, setDialog] = useState({
		message: '',
		isLoading: false
	})

	const handleDialog = (message: string, isLoading: boolean) => {
		setDialog({
			message,
			isLoading
		})
	}

	// ** Navigate
	const navigate = useNavigate()
	// ** Dispatch Actions
	const { getTickets, deleteTicket } = useActions()

	// ** Get Data
	const state = useSelector((state: State) => state.tickets)
	const { loading, tickets } = state

	// ** Delete Ticket
	const handleDelete = (id: number) => {
		handleDialog('Are you sure you want to delete?', true)
		index.current = id
	}

	const areUSureDelete = (choose: boolean) => {
		if (choose) {
			deleteTicket(index.current)
			getTickets()
			handleDialog('', false)
		} else {
			handleDialog('', false)
		}
	}

	useEffect(() => {
		getTickets()
	}, [])

	if (loading === true) {
		return <Spinner />
	} else
		return (
			<div style={{ marginTop: '5rem' }}>
				{tickets && (
					<div
						style={{
							marginBottom: '1rem',
							fontWeight: 'bold',
							textAlign: 'center'
						}}
					>
						There are ({tickets.length}) Tickets
					</div>
				)}
				<div>
					<Button
						onClick={() => navigate('/buyTicket')}
						style={{ marginBottom: '10px' }}
						variant="contained"
					>
						Add Ticket
					</Button>
				</div>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 700 }} aria-label="customized table">
						<TableHead>
							<TableRow>
								<StyledTableCell>Name</StyledTableCell>
								<StyledTableCell align="center">Prices $</StyledTableCell>
								<StyledTableCell align="center">Start Date</StyledTableCell>
								<StyledTableCell align="center">End Date</StyledTableCell>
								<StyledTableCell align="center">Description</StyledTableCell>
								<StyledTableCell align="center">Actions</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{tickets &&
								tickets.length > 0 &&
								tickets.map((ele) => (
									<StyledTableRow key={ele.id}>
										<StyledTableCell component="th" scope="row">
											{ele.name}
										</StyledTableCell>
										<StyledTableCell align="center">
											{ele.price}
										</StyledTableCell>
										<StyledTableCell align="center">
											{ele.startDate}
										</StyledTableCell>
										<StyledTableCell align="center">
											{ele.endDate}
										</StyledTableCell>
										<StyledTableCell align="center">
											{ele.Description}
										</StyledTableCell>
										<StyledTableCell align="center">
											<ButtonGroup
												variant="contained"
												aria-label="outlined primary button group"
											>
												<Button
													onClick={() => navigate(`editTicket/${ele.id}`)}
													style={{ marginRight: '10px' }}
													color="primary"
												>
													<EditOutlinedIcon />
												</Button>
												<Button
													color="secondary"
													onClick={() => handleDelete(ele.id)}
												>
													<DeleteOutlineOutlinedIcon />
												</Button>
											</ButtonGroup>
										</StyledTableCell>
									</StyledTableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
				{dialog.isLoading && (
					<Dialog onDialog={areUSureDelete} message={dialog.message} />
				)}
			</div>
		)
}

export default Home

import React, { useState } from "react";
import axios from "axios";
import {
	Box,
	TextField,
	Button,
	Typography,
	Snackbar,
	Alert,
} from "@mui/material";
import API_BASE_URL from "../../config/api";

const PostJobs = () => {
	const token = localStorage.getItem("token");
	if (!token) return <h1>Please login first</h1>;
	let decoded = {};
	try {
		decoded = jwtDecode(token);
	} catch (err) {
		return <h1>Invalid token</h1>;
	}
	if (decoded.role !== "CLIENT")
		return <h1>You are not authorsed to view this page</h1>;

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [budget, setBudget] = useState("");
	const [deadline, setDeadline] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState(false);
	const [open, setOpen] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!token) {
			setMessage("You must be logged in to post a job");
			setError(true);
			setOpen(true);
			return;
		}
		const payload = { title, description, budget, deadline, token };
		try {
			const res = await axios.post(
				`${API_BASE_URL}/api/jobs`,
				payload,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setMessage(res.data.message);
			setError(false);
			setOpen(true);
			setTitle("");
			setDescription("");
			setBudget("");
			setDeadline("");
		} catch (error) {
			setError(true);
			setMessage(error.response?.data?.message || "Failed to post job");
			setOpen(true);
		}
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	return (
		<Box
			maxWidth={500}
			mx="auto"
			mt={5}
			p={3}
			boxShadow={3}
			borderRadius={2}
		>
			<Typography variant="h5" mb={3} align="center">
				Post a Job
			</Typography>

			<form onSubmit={handleSubmit}>
				<TextField
					label="Title"
					variant="outlined"
					fullWidth
					required
					margin="normal"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<TextField
					label="Description"
					variant="outlined"
					fullWidth
					required
					multiline
					rows={4}
					margin="normal"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>

				<TextField
					label="Budget"
					variant="outlined"
					fullWidth
					required
					type="number"
					margin="normal"
					value={budget}
					onChange={(e) => setBudget(e.target.value)}
				/>

				<TextField
					label="Deadline"
					variant="outlined"
					fullWidth
					required
					type="date"
					margin="normal"
					InputLabelProps={{ shrink: true }}
					value={deadline}
					onChange={(e) => setDeadline(e.target.value)}
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
					sx={{ mt: 3 }}
				>
					Post Job
				</Button>
			</form>

			<Snackbar
				open={open}
				autoHideDuration={4000}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={handleClose}
					severity={error ? "error" : "success"}
					sx={{ width: "100%" }}
				>
					{message}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default PostJobs;

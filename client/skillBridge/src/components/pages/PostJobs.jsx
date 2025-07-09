import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Box,
	TextField,
	Button,
	Typography,
	Snackbar,
	Alert,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from "../../config/api";
import FullScreenLayout from "../FullScreeLayout";
import theme from "../../theme";

const { colors } = theme;

const PostJobs = () => {
	const [decoded, setDecoded] = useState(null);
	const [error, setError] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			setError("Please login first");
			return;
		}
		try {
			const decodedToken = jwtDecode(token);
			if (decodedToken.role !== "CLIENT") {
				setError("You are not authorised to view this page");
				return;
			}
			setDecoded(decodedToken);
		} catch (err) {
			setError("Invalid token");
		}
	}, []);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [budget, setBudget] = useState("");
	const [deadline, setDeadline] = useState("");
	const [message, setMessage] = useState("");
	const [isError, setIsError] = useState(false);
	const [open, setOpen] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		if (!token) {
			setMessage("You must be logged in to post a job");
			setIsError(true);
			setOpen(true);
			return;
		}
		const payload = { title, description, budget, deadline };

		try {
			const res = await axios.post(`${API_BASE_URL}/api/jobs`, payload, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setMessage(res.data.message);
			setIsError(false);
			setOpen(true);
			setTitle("");
			setDescription("");
			setBudget("");
			setDeadline("");
		} catch (error) {
			setIsError(true);
			setMessage(error.response?.data?.message || "Failed to post job");
			setOpen(true);
		}
	};

	const handleClose = (_, reason) => {
		if (reason === "clickaway") return;
		setOpen(false);
	};

	if (error) {
		return (
			<FullScreenLayout>
				<Typography variant="h5" color={colors.error} textAlign="center">
					{error}
				</Typography>
			</FullScreenLayout>
		);
	}

	if (!decoded) {
		return (
			<FullScreenLayout>
				<Typography variant="h5" color={colors.primary} textAlign="center">
					Loading...
				</Typography>
			</FullScreenLayout>
		);
	}

	return (
		<FullScreenLayout>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "100%",
					width: "100%",
					bgcolor: colors.background,
					color: colors.textPrimary,
				}}
			>
				<Box
					maxWidth={500}
					width="100%"
					p={4}
					borderRadius={3}
					boxShadow={4}
					sx={{
						backgroundColor: colors.card,
					}}
				>
					<Typography
						variant="h5"
						mb={3}
						align="center"
						color={colors.primary}
						fontWeight="bold"
					>
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
							InputLabelProps={{ style: { color: colors.textSecondary } }}
							InputProps={{ style: { color: colors.textPrimary } }}
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
							InputLabelProps={{ style: { color: colors.textSecondary } }}
							InputProps={{ style: { color: colors.textPrimary } }}
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
							InputLabelProps={{ style: { color: colors.textSecondary } }}
							InputProps={{ style: { color: colors.textPrimary } }}
						/>

						<TextField
							label="Deadline"
							variant="outlined"
							fullWidth
							required
							type="date"
							margin="normal"
							InputLabelProps={{
								shrink: true,
								style: { color: colors.textSecondary },
							}}
							InputProps={{ style: { color: colors.textPrimary } }}
							value={deadline}
							onChange={(e) => setDeadline(e.target.value)}
						/>

						<Button
							type="submit"
							variant="contained"
							fullWidth
							sx={{
								mt: 3,
								fontWeight: "bold",
								bgcolor: colors.primary,
								color: "#000",
								"&:hover": {
									bgcolor: colors.primaryDark,
								},
							}}
						>
							Post Job
						</Button>
					</form>

					<Snackbar
						open={open}
						autoHideDuration={4000}
						onClose={handleClose}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "center",
						}}
					>
						<Alert
							onClose={handleClose}
							severity={isError ? "error" : "success"}
							sx={{ width: "100%" }}
						>
							{message}
						</Alert>
					</Snackbar>
				</Box>
			</Box>
		</FullScreenLayout>
	);
};

export default PostJobs;

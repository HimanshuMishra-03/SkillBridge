import React, { useState } from "react";
import axios from "axios";
import {
	Box,
	Button,
	TextField,
	Typography,
	Snackbar,
	Alert,
} from "@mui/material";
import API_BASE_URL from "../config/api";

function ForgotPassword() {
	const [identifier, setIdentifier] = useState("");
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${API_BASE_URL}/api/auth/forgotPass`, {
				identifier,
			});
			setSnackbar({
				open: true,
				message: response.data.message || "Reset link sent to your email!",
				severity: "success",
			});
			setIdentifier("");
		} catch (err) {
			setSnackbar({
				open: true,
				message:
					err.response?.data?.message ||
					"Failed to send reset link. Please try again.",
				severity: "error",
			});
		}
	};

	const handleCloseSnackbar = () => {
		setSnackbar((prev) => ({ ...prev, open: false }));
	};

	return (
		<Box maxWidth={400} mx="auto" mt={5}>
			<Typography variant="h5" mb={2}>
				Forgot Password
			</Typography>

			<form onSubmit={handleSubmit}>
				<TextField
					label="Email or Username"
					fullWidth
					required
					value={identifier}
					onChange={(e) => setIdentifier(e.target.value)}
					margin="normal"
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
					sx={{ mt: 2 }}
				>
					Send Reset Link
				</Button>
			</form>

			<Snackbar
				open={snackbar.open}
				autoHideDuration={4000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbar.severity}
					sx={{ width: "100%" }}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Box>
	);
}

export default ForgotPassword;

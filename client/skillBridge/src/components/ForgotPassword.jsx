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
import FullScreenLayout from "./FullScreeLayout.jsx";

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
		<FullScreenLayout>
			<Box
				component="form"
				onSubmit={handleSubmit}
				maxWidth={400}
				width="100%"
				display="flex"
				flexDirection="column"
				gap={2}
				sx={{
					backgroundColor: "#142a4c",
					p: 4,
					borderRadius: 2,
					boxShadow: "0 0 15px rgba(0,0,0,0.6)",
				}}
			>
				<Typography
					variant="h5"
					textAlign="center"
					fontWeight="bold"
					color="#00bcd4"
				>
					Forgot Password
				</Typography>

				<TextField
					label="Email or Username"
					fullWidth
					required
					variant="filled"
					value={identifier}
					onChange={(e) => setIdentifier(e.target.value)}
					InputProps={{ style: { color: "#e0f7fa" } }}
					InputLabelProps={{ style: { color: "#80deea" } }}
					sx={{ backgroundColor: "#0d1b2a", borderRadius: 1 }}
				/>

				<Button
					type="submit"
					variant="contained"
					fullWidth
					size="large"
					sx={{
						backgroundColor: "#00bcd4",
						color: "#0d1b2a",
						fontWeight: "bold",
						"&:hover": { backgroundColor: "#00acc1" },
					}}
				>
					Send Reset Link
				</Button>

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
		</FullScreenLayout>
	);
}

export default ForgotPassword;

import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router";
import {
	Box,
	Button,
	TextField,
	Typography,
	Snackbar,
	Alert,
} from "@mui/material";
import FullScreenLayout from "./FullScreeLayout.jsx";
import API_BASE_URL from "../config/api.js";

function Login() {
	const [formData, setFormData] = useState({
		identifier: "",
		password: "",
	});

	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				`${API_BASE_URL}/api/auth/login`,
				formData
			);
			const decoded = jwtDecode(response.data.token);
			localStorage.setItem("token", response.data.token);

			setSnackbar({
				open: true,
				message: response.data.message || "Login successful!",
				severity: "success",
			});

			if (decoded.role === "CLIENT") navigate("/client-dashboard");
			else if (decoded.role === "FREELANCER")
				navigate("/freelancer-dashboard");
			else navigate("/admin-dashboard");
		} catch (err) {
			setSnackbar({
				open: true,
				message:
					err.response?.data?.errorMessage ||
					err.response?.data?.message ||
					"Login failed",
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
				mx="auto"
				display="flex"
				flexDirection="column"
				gap={2}
				sx={{
					backgroundColor: "#142a4c",
					padding: 4,
					borderRadius: 2,
					boxShadow: "0 0 15px rgba(0,0,0,0.6)",
				}}
			>
				<Typography
					variant="h4"
					align="center"
					fontWeight="bold"
					color="#00bcd4"
				>
					Login
				</Typography>

				<TextField
					label="Username or Email"
					name="identifier"
					value={formData.identifier}
					onChange={handleChange}
					required
					fullWidth
					variant="filled"
					InputProps={{ style: { color: "#e0f7fa" } }}
					InputLabelProps={{ style: { color: "#80deea" } }}
					sx={{ backgroundColor: "#0d1b2a", borderRadius: 1 }}
				/>

				<TextField
					label="Password"
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					required
					fullWidth
					variant="filled"
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
					Login
				</Button>

				<Typography variant="body2" align="center" color="#e0f7fa">
					<Link
						to="/forgot-password"
						style={{ textDecoration: "none", color: "#00bcd4" }}
					>
						Forgot Password?
					</Link>
				</Typography>

				<Typography variant="body2" align="center" color="#e0f7fa">
					Don’t have an account?{" "}
					<Link
						to="/register"
						style={{ textDecoration: "none", color: "#00bcd4" }}
					>
						Register
					</Link>
				</Typography>

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

export default Login;

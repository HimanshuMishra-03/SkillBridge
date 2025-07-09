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
	const [loading, setLoading] = useState(false)
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
		setLoading(true)
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
			else if (decoded.role === "FREELANCER") navigate("/freelancer-dashboard");
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
		}finally{
			setLoading(false)
		}
	};

	const handleCloseSnackbar = () => {
		setSnackbar((prev) => ({ ...prev, open: false }));
	};

	return (
		<FullScreenLayout>
			<Button
				variant="outlined"
				onClick={() => navigate(-1)}
				sx={{
					alignSelf: "flex-start",
					mb: 2,
					color: "#3B82F6",
					borderColor: "#3B82F6",
					textTransform: "none",
					fontWeight: 500,
					"&:hover": {
						borderColor: "#2563EB",
						color: "#2563EB",
					},
				}}
			>
				← Back
			</Button>

			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{
					width: {
						xs: "70vw",
						sm: "50vw",
						md: "30vw",
						lg: "25vw",
					},
					backgroundColor: "#FFFFFF", // Cloud Gray
					padding: {
						xs: 3,
						sm: 4,
					},
					borderRadius: 2,
					border: "1px solid #E5E7EB", // Silver Mist
					boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
					display: "flex",
					flexDirection: "column",
					gap: 2,
					mx: "auto",
					color: "#111827", // Charcoal Black
				}}
			>
				<Typography
					variant="h4"
					align="center"
					fontWeight="bold"
					color="#3B82F6"
					sx={{ fontSize: { xs: "1.8rem", sm: "2rem" }, mb: 1 }}
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
					variant="outlined"
					InputLabelProps={{ style: { color: "#6B7280" } }} // Cool Gray
				/>

				<TextField
					label="Password"
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					required
					fullWidth
					variant="outlined"
					InputLabelProps={{ style: { color: "#6B7280" } }}
				/>

				<Button
					type="submit"
					variant="contained"
					fullWidth
					size="large"
					disabled={loading}
					sx={{
						backgroundColor: "#3B82F6",
						color: "#FFFFFF",
						fontWeight: "bold",
						"&:hover": { backgroundColor: "#2563EB" },
					}}
				>
					Login
				</Button>

				<Typography variant="body2" align="center" color="#6B7280">
					<Link
						to="/forgot-password"
						style={{ textDecoration: "none", color: "#3B82F6" }}
					>
						Forgot Password?
					</Link>
				</Typography>

				<Typography variant="body2" align="center" color="#6B7280">
					Don’t have an account?{" "}
					<Link
						to="/register"
						style={{ textDecoration: "none", color: "#3B82F6" }}
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
						sx={{
							width: "100%",
							backgroundColor:
								snackbar.severity === "success" ? "#10B981" : "#EF4444",
							color: "#FFFFFF",
						}}
					>
						{snackbar.message}
					</Alert>
				</Snackbar>
			</Box>
		</FullScreenLayout>
	);
}

export default Login;

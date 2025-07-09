import React, { useState } from "react";
import {
	TextField,
	Button,
	MenuItem,
	Typography,
	Snackbar,
	Alert,
	Link,
	Box,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import API_BASE_URL from "../config/api";
import FullScreenLayout from "./FullScreeLayout";
import daylightTheme from "../theme";

function RegistrationForm() {
	const location = useLocation();
	const navigate = useNavigate();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const { colors } = daylightTheme;

	const searchParams = new URLSearchParams(location.search);
	const initialRole =
		searchParams.get("role")?.toUpperCase() === "FREELANCER"
			? "FREELANCER"
			: "CLIENT";

	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		role: initialRole,
		companyName: "",
		bio: "",
		skills: "",
	});

	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState("");
	const [open, setOpen] = useState(false);
	const [severity, setSeverity] = useState("success");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true)
		try {
			const payload = {
				username: formData.username,
				email: formData.email,
				password: formData.password,
				role: formData.role,
				...(formData.role === "CLIENT" && {
					companyName: formData.companyName,
				}),
				...(formData.role === "FREELANCER" && {
					bio: formData.bio,
					skills: formData.skills.split(",").map((skill) => skill.trim()),
				}),
			};

			const res = await axios.post(
				`${API_BASE_URL}/api/auth/register`,
				payload
			);

			setMessage(res.data.message || "User registered successfully!");
			setSeverity("success");
			setOpen(true);

			setFormData({
				username: "",
				email: "",
				password: "",
				role: initialRole,
				companyName: "",
				bio: "",
				skills: "",
			});
		} catch (err) {
			setMessage(
				err.response?.data?.errorMessage || "Error registering user"
			);
			setSeverity("error");
			setOpen(true);
		}finally{
			setLoading(false)
		}
	};

	return (
		<FullScreenLayout>
			<Button
				variant="outlined"
				onClick={() => navigate(-1)}
				sx={{
					alignSelf: "flex-start",
					mb: 2,
					color: colors.primary,
					borderColor: colors.primary,
					textTransform: "none",
					"&:hover": {
						borderColor: colors.primaryDark,
						color: colors.primaryDark,
					},
				}}
			>
				← Back
			</Button>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{
					width: isMobile ? "72vw" : "86vw",
					maxWidth: 450,
					mx: "auto",
					backgroundColor: colors.backgroundDark,
					padding: isMobile ? 3 : 5,
					borderRadius: 2,
					boxShadow: "0 0 15px rgba(0,0,0,0.6)",
					display: "flex",
					flexDirection: "column",
					overflowX: "hidden",
					gap: 2,
					mt: isMobile ? 4 : 6,
					mb: isMobile ? 4 : 6,
				}}
			>
				<Typography
					variant="h5"
					align="center"
					fontWeight="bold"
					color={colors.primary}
				>
					Register
				</Typography>

				<TextField
					select
					label="Registering as"
					name="role"
					value={formData.role}
					onChange={handleChange}
					fullWidth
					variant="filled"
					InputProps={{ style: { color: colors.textPrimary } }}
					InputLabelProps={{ style: { color: colors.textSecondary } }}
					sx={{ backgroundColor: colors.card, borderRadius: 1 }}
				>
					<MenuItem value="CLIENT" sx={{ color: colors.primary }}>
						Client
					</MenuItem>
					<MenuItem value="FREELANCER" sx={{ color: colors.primary }}>
						Freelancer
					</MenuItem>
				</TextField>

				<TextField
					label="Username"
					name="username"
					value={formData.username}
					onChange={handleChange}
					required
					fullWidth
					variant="filled"
					InputProps={{ style: { color: colors.textPrimary } }}
					InputLabelProps={{ style: { color: colors.textSecondary } }}
					sx={{ backgroundColor: colors.card, borderRadius: 1 }}
				/>

				<TextField
					label="Email"
					name="email"
					type="email"
					value={formData.email}
					onChange={handleChange}
					required
					fullWidth
					variant="filled"
					InputProps={{ style: { color: colors.textPrimary } }}
					InputLabelProps={{ style: { color: colors.textSecondary } }}
					sx={{ backgroundColor: colors.card, borderRadius: 1 }}
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
					InputProps={{ style: { color: colors.textPrimary } }}
					InputLabelProps={{ style: { color: colors.textSecondary } }}
					sx={{ backgroundColor: colors.card, borderRadius: 1 }}
				/>

				{formData.role === "CLIENT" && (
					<TextField
						label="Company Name"
						name="companyName"
						value={formData.companyName}
						onChange={handleChange}
						fullWidth
						variant="filled"
						InputProps={{ style: { color: colors.textPrimary } }}
						InputLabelProps={{ style: { color: colors.textSecondary } }}
						sx={{ backgroundColor: colors.card, borderRadius: 1 }}
					/>
				)}

				{formData.role === "FREELANCER" && (
					<>
						<TextField
							label="Bio"
							name="bio"
							value={formData.bio}
							onChange={handleChange}
							multiline
							minRows={3}
							fullWidth
							variant="filled"
							InputProps={{ style: { color: colors.textPrimary } }}
							InputLabelProps={{ style: { color: colors.textSecondary } }}
							sx={{ backgroundColor: colors.card, borderRadius: 1 }}
						/>
						<TextField
							label="Skills (comma-separated)"
							name="skills"
							value={formData.skills}
							onChange={handleChange}
							fullWidth
							variant="filled"
							InputProps={{ style: { color: colors.textPrimary } }}
							InputLabelProps={{ style: { color: colors.textSecondary } }}
							sx={{ backgroundColor: colors.card, borderRadius: 1 }}
						/>
					</>
				)}

				<Button
					type="submit"
					variant="contained"
					fullWidth
					disabled={loading}
					size="large"
					sx={{
						backgroundColor: colors.primary,
						color: colors.background,
						fontWeight: "bold",
						"&:hover": { backgroundColor: colors.primaryDark },
					}}
				>
					Register
				</Button>

				<Typography variant="body2" align="center" color={colors.textPrimary}>
					Already have an account? {" "}
					<Link
						component="button"
						onClick={() => navigate("/login")}
						underline="hover"
						sx={{ color: colors.primary, fontWeight: "bold" }}
					>
						Login
					</Link>
				</Typography>

				<Snackbar
					open={open}
					autoHideDuration={4000}
					onClose={() => setOpen(false)}
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				>
					<Alert
						onClose={() => setOpen(false)}
						severity={severity}
						sx={{ width: "100%" }}
					>
						{message}
					</Alert>
				</Snackbar>
			</Box>
		</FullScreenLayout>
	);
}

export default RegistrationForm;

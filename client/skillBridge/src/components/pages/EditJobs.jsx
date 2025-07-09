import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { jwtDecode } from "jwt-decode";
import {
	Typography,
	TextField,
	Button,
	Snackbar,
	Alert,
	CircularProgress,
	Box,
} from "@mui/material";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import API_BASE_URL from "../../config/api";
import FullScreenLayout from "../FullScreeLayout";
import theme from "../../theme";

const { colors } = theme;

const EditJobs = () => {
	const [decoded, setDecoded] = useState(null);
	const [error, setError] = useState("");
	const token = localStorage.getItem("token");

	useEffect(() => {
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

	const { id } = useParams();
	const [jobDetails, setJobDetails] = useState({
		title: "",
		description: "",
		budget: "",
		deadline: null,
	});
	const [loading, setLoading] = useState(true);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "info",
	});
	const navigate = useNavigate();

	useEffect(() => {
		const fetchJobDetails = async () => {
			try {
				const res = await axios.get(`${API_BASE_URL}/api/jobs/${id}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				const job = res.data.jobDetail;
				setJobDetails({
					...job,
					deadline: new Date(job.deadline),
				});
			} catch (error) {
				setSnackbar({
					open: true,
					message: "Failed to fetch job details",
					severity: "error",
				});
			} finally {
				setLoading(false);
			}
		};

		fetchJobDetails();
	}, [id]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setJobDetails((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await axios.patch(
				`${API_BASE_URL}/api/jobs/${id}/patch`,
				{
					updateData: {
						...jobDetails,
						deadline: new Date(jobDetails.deadline).toISOString(),
						budget: Number(jobDetails.budget),
					},
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			setSnackbar({
				open: true,
				message: res.data.message,
				severity: "success",
			});
			navigate(`/job-details/${id}`);
		} catch (error) {
			setSnackbar({
				open: true,
				message:
					error?.response?.data?.message || "Failed to update job",
				severity: "error",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<FullScreenLayout>
			<Box
				sx={{
					maxWidth: "600px",
					mx: "auto",
					p: 4,
					borderRadius: 4,
					backgroundColor: colors.card,
					boxShadow: "0 0 15px rgba(0,0,0,0.15)",
				}}
			>
				<Typography
					variant="h4"
					gutterBottom
					align="center"
					sx={{
						fontWeight: 700,
						color: colors.primary,
						mb: 3,
					}}
				>
					Edit Job Details
				</Typography>

				{loading ? (
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						<CircularProgress sx={{ color: colors.primary }} />
					</Box>
				) : (
					<form onSubmit={handleSubmit}>
						<TextField
							label="Job Title"
							name="title"
							value={jobDetails.title}
							onChange={handleInputChange}
							fullWidth
							margin="normal"
							variant="filled"
							required
							InputLabelProps={{ style: { color: colors.textSecondary } }}
							InputProps={{ style: { color: colors.textPrimary } }}
							sx={{
								backgroundColor: colors.lightGray,
								borderRadius: 1,
							}}
						/>
						<TextField
							label="Description"
							name="description"
							value={jobDetails.description}
							onChange={handleInputChange}
							variant="filled"
							fullWidth
							multiline
							rows={4}
							required
							InputLabelProps={{ style: { color: colors.textSecondary } }}
							InputProps={{ style: { color: colors.textPrimary } }}
							sx={{
								backgroundColor: colors.lightGray,
								borderRadius: 1,
							}}
						/>
						<TextField
							label="Budget"
							name="budget"
							value={jobDetails.budget}
							onChange={handleInputChange}
							fullWidth
							margin="normal"
							type="number"
							variant="filled"
							required
							InputLabelProps={{ style: { color: colors.textSecondary } }}
							InputProps={{ style: { color: colors.textPrimary } }}
							sx={{
								backgroundColor: colors.lightGray,
								borderRadius: 1,
							}}
						/>

						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DateTimePicker
								label="Deadline"
								value={jobDetails.deadline}
								onChange={(newValue) =>
									setJobDetails((prev) => ({
										...prev,
										deadline: newValue,
									}))
								}
								slotProps={{
									textField: {
										fullWidth: true,
										margin: "normal",
										variant: "filled",
										InputLabelProps: { style: { color: colors.textSecondary } },
										InputProps: { style: { color: colors.textPrimary } },
										sx: {
											backgroundColor: colors.lightGray,
											borderRadius: 1,
											"& .MuiInputAdornment-root svg": {
												color: colors.secondary,
											},
											"& label.Mui-focused": {
												color: colors.primary,
											},
										},
									},
								}}
							/>
						</LocalizationProvider>

						<Button
							type="submit"
							variant="contained"
							fullWidth
							sx={{
								mt: 3,
								backgroundColor: colors.primary,
								color: colors.card,
								fontWeight: 600,
								"&:hover": {
									backgroundColor: colors.primaryDark,
								},
							}}
							disabled={loading}
						>
							{loading ? "Updating..." : "Update Job"}
						</Button>
					</form>
				)}

				<Snackbar
					open={snackbar.open}
					autoHideDuration={3000}
					onClose={() => setSnackbar({ ...snackbar, open: false })}
				>
					<Alert
						onClose={() =>
							setSnackbar({ ...snackbar, open: false })
						}
						severity={snackbar.severity}
						sx={{ width: "100%" }}
					>
						{snackbar.message}
					</Alert>
				</Snackbar>
			</Box>
		</FullScreenLayout>
	);
};

export default EditJobs;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
	Box,
	Typography,
	CircularProgress,
	Snackbar,
	Alert,
	Divider,
} from "@mui/material";
import axios from "axios";
import FullScreenLayout from "../FullScreeLayout";
import API_BASE_URL from "../../config/api";

function ProjectDashboard() {
	const { projectId } = useParams();
	const [projectData, setProjectData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [open, setOpen] = useState(false);
	const [timeLeft, setTimeLeft] = useState({});

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const res = await axios.get(
					`${API_BASE_URL}/api/project-dashboard/${projectId}`
				);
				setProjectData(res.data.project);
			} catch (err) {
				setError(
					err.response?.data?.message || "Something went wrong!"
				);
				setOpen(true);
			} finally {
				setLoading(false);
			}
		};

		if (projectId) fetchProject();
	}, [projectId]);

	useEffect(() => {
		if (!projectData) return;

		const interval = setInterval(() => {
			const deadline = new Date(projectData.startedAt);
			deadline.setDate(deadline.getDate() + projectData.duration);

			const now = new Date();
			const diff = deadline - now;

			if (diff <= 0) {
				setTimeLeft(null); // deadline passed
				clearInterval(interval);
			} else {
				const days = Math.floor(diff / (1000 * 60 * 60 * 24));
				const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
				const minutes = Math.floor((diff / (1000 * 60)) % 60);
				const seconds = Math.floor((diff / 1000) % 60);
				setTimeLeft({ days, hours, minutes, seconds });
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [projectData]);

	if (loading) {
		return (
			<FullScreenLayout>
				<Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
					<CircularProgress color="info" />
				</Box>
			</FullScreenLayout>
		);
	}

	if (!projectData) {
		return (
			<FullScreenLayout>
				<Box textAlign="center" mt={4}>
					<Typography variant="h6" color="error">
						Project not found or error occurred.
					</Typography>
				</Box>
			</FullScreenLayout>
		);
	}

	const {
		jobTitle,
		duration,
		status,
		projectId: id,
		startedAt,
		clientId,
		freelancerId,
		role,
	} = projectData;

	const timeStyle = {
		border: "2px solid",
		borderColor: timeLeft ? "#00e5ff" : "#f44336",
		padding: "10px 15px",
		borderRadius: "10px",
		fontWeight: 600,
		color: timeLeft ? "#00e5ff" : "#f44336",
		transition: "all 0.3s ease-in-out",
		background: timeLeft ? "#0f1c2e" : "#2c0e0e",
		textAlign: "center",
	};

	return (
		<FullScreenLayout>
			<Box p={4}>
				<Typography variant="h4" mb={1} color="#00e5ff">
					Project Dashboard - {role === "CLIENT" ? "Client View" : "Freelancer View"}
				</Typography>
				<Divider sx={{ mb: 3, background: "#00e5ff" }} />

				<Box
					sx={{
						background: "#0f1c2e",
						padding: 3,
						borderRadius: 4,
						boxShadow: "0 0 15px rgba(0,229,255,0.2)",
						color: "#e0f7fa",
						lineHeight: 1.8,
					}}
				>
					<Typography>Job Title: {jobTitle}</Typography>
					<Typography>Status: {status}</Typography>
					<Typography>Duration: {duration} days</Typography>
					<Typography>Started At: {new Date(startedAt).toLocaleString()}</Typography>
					<Typography>Client ID: {clientId}</Typography>
					<Typography>Freelancer ID: {freelancerId}</Typography>
					<Typography>Project ID: {id}</Typography>

					<Box mt={3} sx={timeStyle}>
						{timeLeft ? (
							<Typography>
								⏳ Time Left: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
							</Typography>
						) : (
							<Typography>🚨 Deadline Passed</Typography>
						)}
					</Box>
				</Box>

				<Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
					<Alert severity="error" onClose={() => setOpen(false)}>
						{error}
					</Alert>
				</Snackbar>
			</Box>
		</FullScreenLayout>
	);
}

export default ProjectDashboard;

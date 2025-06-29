import React from "react";
import { useNavigate } from "react-router";
import {
	Box,
	Button,
	Typography,
	Link,
	Stack,
	useTheme,
	useMediaQuery,
} from "@mui/material";

const HomePage = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Box
			sx={{
				height: "100vh", 
				width: "100vw",
				backgroundColor: "#0d1b2a",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				px: 2,
				overflow: "hidden", 
				boxSizing: "border-box",
			}}
		>
			<Box
				sx={{
					width: "100%",
					maxWidth: 1000,
					textAlign: "center",
					mx: "auto",
					px: 2,
				}}
			>
				<Typography
					variant={isMobile ? "h6" : "h3"}
					sx={{ color: "#00bcd4", mb: 1 }} 
				>
					Welcome to
				</Typography>

				<Typography
					variant={isMobile ? "h3" : "h1"}
					fontWeight="bold"
					sx={{
						color: "#00bcd4",
						letterSpacing: "0.1em",
						userSelect: "none",
						mb: 4,
					}}
				>
					SkillBridge
				</Typography>

				<Typography
					variant={isMobile ? "body1" : "h6"}
					sx={{ color: "rgba(255, 255, 255, 0.75)", mb: 5 }}
				>
					Your gateway to freelance opportunities and top talent
				</Typography>

				<Stack
					spacing={2}
					direction={isMobile ? "column" : "row"}
					justifyContent="center"
					alignItems="center"
				>
					<Button
						variant="contained"
						size="large"
						onClick={() => navigate("/register?role=client")}
						sx={{
							px: 4,
							py: 1.5,
							borderRadius: 3,
							fontWeight: "bold",
							width: isMobile ? "100%" : "auto",
							backgroundColor: "#00bcd4",
							color: "#0d1b2a",
							"&:hover": { backgroundColor: "#00acc1" },
						}}
					>
						POST A JOB
					</Button>

					<Button
						variant="outlined"
						size="large"
						onClick={() => navigate("/register?role=freelancer")}
						sx={{
							px: 4,
							py: 1.5,
							borderRadius: 3,
							fontWeight: "bold",
							borderColor: "#00bcd4",
							color: "#00bcd4",
							width: isMobile ? "100%" : "auto",
							"&:hover": {
								borderColor: "#00acc1",
								color: "#00acc1",
							},
						}}
					>
						VIEW & APPLY FOR JOBS
					</Button>
				</Stack>

				<Box mt={4}>
					<Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)" }}>
						Already registered?{" "}
						<Link href="/login" underline="hover" sx={{ color: "#00bcd4" }}>
							Login here
						</Link>
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default HomePage;

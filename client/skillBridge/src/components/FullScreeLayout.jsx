import React from "react";
import { Box } from "@mui/material";

const FullScreenLayout = ({ children }) => {
	return (
		<Box
			sx={{
				minHeight: "100vh", // ✅ fixes mobile height issues
				width: "100vw",
				backgroundColor: "#0d1b2a",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				px: 2,
				overflowY: "auto", // ✅ allow scroll if content overflows
				boxSizing: "border-box",
			}}
		>
			<Box
				sx={{
					width: "100%",
					maxWidth: 1000,
					px: { xs: 2, sm: 4 },
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				{children}
			</Box>
		</Box>
	);
};

export default FullScreenLayout;

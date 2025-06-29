import React from "react";
import { Box } from "@mui/material";

const FullScreenLayout = ({ children }) => {
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
				{children}
			</Box>
		</Box>
	);
};

export default FullScreenLayout;

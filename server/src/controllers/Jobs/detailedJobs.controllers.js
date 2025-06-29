import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const detailedJobs = async (req, res) => {
	const { id } = req.params;
	if (!id)
		return res
			.status(400)
			.json({
				message: "No content sharing between frontend and backend!",
			});
	try {
		const jobDetail = await prisma.job.findUnique({
			where: { id },
		});
		if (!jobDetail)
			return res.status(404).json({ message: "Job not found" });
		return res
			.status(200)
			.json({ message: "Your requested job details", jobDetail });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};
export { detailedJobs };

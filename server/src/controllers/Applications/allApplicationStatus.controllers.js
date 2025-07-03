import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const applicationStatus = async (req, res) => {
	const { id } = req.params;
	if (!id)
		return res.status(400).json({ message: "Can't fetch ID from url!" });
	try {
		const applications = await prisma.application.findMany({
			where: { freelancerId: id },
		});
		// console.log(applications)
		if (!applications || applications.length === 0) {
			return res.status(404).json({ message: "No applications found!" });
		}
		const updatedApplications = await Promise.all(
			applications.map(async (application) => {
				const job = await prisma.job.findFirst({
					where: { id: application.jobId },
				});
				return { ...application, title: job.title };
			})
		);
        // console.log(updatedApplications)
		return res
			.status(200)
			.json({
				message: "Here are all of your applications!",
				updatedApplications,
			});
	} catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
    }
};
export { applicationStatus };

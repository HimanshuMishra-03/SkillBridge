import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const viewApplication = async (req, res) => {
	try {
		const { jobId } = req.params;
		if (!jobId) return res.status(400).json({ message: "No JobId" });
		const job = await prisma.job.findUnique({
			where: {id: jobId}
		})
		const applicationList = await prisma.application.findMany({
			where: { jobId },
		});

		// const applicantNames = []
		// applicationList.map(async (application) => {
		// 	const applicant = await prisma.user.findUnique({
		// 		where: { id: application.freelancerId },
		// 	});
		// 	const applicantName = applicant.username;
		// 	return {
		// 		...application,
		// 		applicantName: applicant?.username || "Unknown",
		// 	};
		// 	// const applicantIdentity = {
		// 	// 	applicantId : application.freelancerId,
		// 	// 	applicantName : applicant.username
		// 	// }
		// 	// applicantNames.push(applicantIdentity)
		// });

		const enrichedApplications = await Promise.all(
			applicationList.map(async (application) => {
				const applicant = await prisma.user.findUnique({
					where: { id: application.freelancerId },
				});

				return {
					...application,
					applicantName: applicant?.username || "Unknown",
				};
			})
		);
		if (applicationList.length === 0)
			return res
				.status(400)
				.json({ message: "No applications for your jobs yet!" });
		return res
			.status(200)
			.json({ message: "Applications for your Job", applicationList:enrichedApplications, jobName:job.title });
	} catch (error) {
		console.log(error);
	}
};
export { viewApplication };

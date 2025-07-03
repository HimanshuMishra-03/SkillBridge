import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const projectDashboard = async (req, res) => {
	try {
        // console.log("Errorr Here")
		const { projectId } = req.params;
        const {role} = req.user
		if (!projectId)
			return res
				.status(400)
				.json({ message: "Can't fetch project Id from url!" });
		const project = await prisma.project.findFirst({
			where: { projectId },
		});
		const application = await prisma.application.findFirst({
			where: { id: project.applicationId },
		});
		const job = await prisma.job.findFirst({
			where: { id: project.jobId },
		});
        const upadatedProject= {
					...project,
					jobTitle: job.title,
					duration: application.duration,
                    role: role
				}
        // console.log(upadatedProject)
		return res
			.status(200)
			.json({
				message: "Project Dashboard",
				project: upadatedProject,
			});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal Server Error!" });
	}
};
export { projectDashboard };

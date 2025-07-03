import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const viewApplicationAndStatus = async (req, res) => {
	const { applicationId } = req.params;
	if (!applicationId)
		return res
			.status(400)
			.json({ message: "Can't fetch application id from url" });
	try {
		const application = await prisma.application.findFirst({
			where: { id: applicationId },
		});
		if (!application)
			return res
				.status(400)
				.json({ message: "No application for this application id!" });
		const job = await prisma.job.findFirst({
			where: {id: application.jobId},
		});
        const project = await prisma.project.findFirst({
			where: {jobId : job.id}
		})
		// Checking whether job is allocated and project is created!
		if(project && (project.applicationId!==application.id)) {
			// await prisma.job.update({where: {id: job.id}, data:{isAccepted: true}});
			await prisma.application.update({where: {id: applicationId}, data: {status: "REJECTED"}})
		}
		else if(project && project.applicationId === application.id)return res.status(200).json({message:`You are assigned to ${job.title} job`, application:{...application, jobTitle:job.title, projectId: project.projectId}})
        const updatedApplication = {...application, jobTitle:job.title}
        return res.status(200).json({message:"Here is your application status", application: updatedApplication})
	} catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};
export { viewApplicationAndStatus };

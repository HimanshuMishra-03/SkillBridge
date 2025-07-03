import express from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();
const viewMyJobs = async (req, res) => {
	try {
		const { id } = req.user;
		// const token = req.headers.authorization?.split(" ")[1]
		// if(!token) return res.status(400).json({message: "Invalid request"})

		// const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
		const clientId = id;

		const jobs = await prisma.job.findMany({
			where: { clientId },
			orderBy: { createdAt: "desc" },
		});
		if (!jobs)
			return res.status(400).json({ message: "No jobs posted yet!" });
		const projects = await Promise.all(
			jobs.map(async (job) => {
				const project = await prisma.project.findFirst({
					where: { jobId: job.id },
				});
                if (!project) return {...job, projectId: null}
                return {...job, projectId: project.projectId}
			})
		);
		console.log(projects)
		return res
			.status(200)
			.json({ message: "Here are requested jobs!", jobs:projects });
	} catch (error) {}
};
export { viewMyJobs };

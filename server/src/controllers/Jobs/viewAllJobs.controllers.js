import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
dotenv.config();
const prisma = new PrismaClient();
const viewAllJobs = async (req, res) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) return res.status(400).json({ message: "No Token" });

		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		if (!decoded)
			return res.status(400).json({ message: "Session Invalid" });

		const jobs = await prisma.job.findMany({
            orderBy: {createdAt: 'desc'}
        });
		// const updatedJobs = await Promise.all(
		// 	jobs.map((job)=>(
		// 		job.deadline
		// 	))
		// )
		return res.status(200).json({ message: "Viewing all jobs", jobs });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something Went Wrong!" });
	}
};
export { viewAllJobs };

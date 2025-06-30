import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();
const jobPost = async (req, res) => {
	const { title, description, budget, deadline, token } = req.body;
	try {
        // Checking validity of input 
		if (!title || !description || !budget || !deadline) {
			return res.status(400).json({ message: "All fields are required" });
		}
        // Is budget a number
        if(isNaN(budget)) return res.status(400).json({message: "Budget must be a number"})
        // Is deadline date of Future and is it valid number 
        const deadlineDate = new Date(deadline)
        const currentDate = new Date()
        if(isNaN(new Date(deadline).getTime())) return res.status(400).json({message: "Invalid Date selection"})
        if(currentDate>deadlineDate) return res.status(400).json({message: "Invalid date"})
        // Verifying Token 
		const {id} = req.user
		if (id) {
			const clientId = id;
			const job = await prisma.job.findFirst({
				where: { title, clientId },
			});
			if (job)
				return res.status(400).json({ message: "Job already Exist" });
			await prisma.job.create({
				data: {
					title,
					description,
					budget: parseInt(budget, 10),
					deadline: deadlineDate,
					clientId,
				},
			});
			return res.status(200).json({ message: "Job Created and Posted" });
		}
		return res
			.status(400)
			.json({ message: "Session Expired, try logging in again" });
	} catch (error) {
		console.log(error);
        return res.status(500).json({message: "Something went wrong!"})
	}
};
export { jobPost };

import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const editJob = async (req, res) => {
	// try {
	// 	const { id } = req.params;
	// 	const job = await prisma.job.findUnique({
	// 		where: { id },
	// 	});
	// 	if (!job)
	// 		return res.status(400).json({ message: "Job Does Not Exist!" });
	// 	await prisma.job.update({
	// 		where: { id },
    //         data
	// 	});
	// } catch (error) {
	// 	console.log(error);
	// }
};
export { editJob };

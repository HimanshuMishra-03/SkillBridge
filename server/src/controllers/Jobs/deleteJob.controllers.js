import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const deleteJobs = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id)
			return res
				.status(400)
				.json({ message: "Can't share id from frontend to backend" });
		const job = await prisma.job.delete({
			where: { id },
		});
        return res.status(204).json({message: "Job deleted!"})
	} catch (error) {
		console.log(error);
	}
};
export { deleteJobs };

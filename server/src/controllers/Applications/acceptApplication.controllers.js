import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();
const prisma = new PrismaClient();
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});
const acceptApplication = async (req, res) => {
	try {
		const { applicationId } = req.params;
		const { id } = req.user;
		if (!applicationId)
			return res
				.status(400)
				.json({ message: "Can't fetch appliation id from url." });
		const job = await prisma.job.findFirst({
			where: { clientId: id },
		});
		await prisma.job.update({
			where: { id: job.id },
			data: {
				status: "CLOSED",
				isAccepted: true,
			},
		});
		const application = await prisma.application.findFirst({
			where: { id: applicationId },
		});
		const user = await prisma.user.findFirst({
			where: { id: application.freelancerId },
		});
		const existingproject = await prisma.project.findFirst({
			where: {
				OR: [{ jobId: job.id }, { applicationId: applicationId }],
			},
		});
		if (existingproject)
			return res
				.status(400)
				.json({ message: `Project already exist for same job id` });
		const project = await prisma.project.create({
			data: {
				jobId: job.id,
				applicationId: applicationId,
				freelancerId: application.freelancerId,
				clientId: job.clientId,
				status: "IN_PROGRESS",
			},
		});
		await prisma.application.update({
			where: { id: applicationId },
			data: {
				status: "ACCEPTED",
			},
		});

		try {
			await transporter.sendMail({
				from: `"Skill Bridge" <${process.env.EMAIL_USER}>`,
				to: user.email,
				subject: `You're selected for ${job.title} job`,
				html: `
      <h2>Your application was selected by client.</h2>
      <p>Click below to redirect to project:</p>
      <a href="https://skill-bridge-lilac.vercel.app/projectDashboard/${project.projectId}">Open Project Dashboard.</a>
    `,
			});
		} catch (emailError) {
			console.error("Error sending email:", emailError);
		}
		return res.status(200).json({
			message: `Project Created and Job assigned to ${user.username}`,
			project,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal Server Error!" });
	}
};
export { acceptApplication };

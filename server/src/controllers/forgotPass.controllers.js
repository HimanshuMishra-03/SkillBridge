import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});
const forgotPass = async (req, res) => {
	const { identifier } = req.body;
	const user = await prisma.user.findFirst({
		where: {
			OR: [{ email: identifier }, { username: identifier }],
		},
		include: {
			client: true,
			freelancer: true,
		},
	});
	if (!user)
		return res
			.status(400)
			.json({ message: "No registered email or username found!" });
	try {
		const recieverEmail = user.email;
		const payload = { id: user.id, role: user.role };
		const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
			expiresIn: "15m",
		});
		const resetLink = `http://localhost:5173/reset-password?token=${token}`;
		await transporter.sendMail({
			from: `"Skill Bridge" <${process.env.EMAIL_USER}>`,
			to: recieverEmail,
			subject: "Password Reset Link",
			html: `
      <h2>Reset Your Password</h2>
      <p>Click below to reset:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 15 minutes.</p>
    `,
		});
        return res.status(200).json({message: "Email Sent"})
	} catch (error) {
		console.log(error);
	}
};
export { forgotPass };

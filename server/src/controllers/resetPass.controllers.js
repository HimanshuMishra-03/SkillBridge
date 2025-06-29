import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const resetPass = async (req, res) => {
	const { token, password } = req.body;
	const isValid = jwt.verify(token, process.env.JWT_SECRET_KEY);
	if (!isValid)
		return res
			.status(400)
			.json({
				message:
					"Session invalid or expired try again after few minutes!",
			});
	try {
		const decoded = jwt.decode(token);
		const user = await prisma.user.findUnique({
			where: { id: decoded.id },
			include: {
				client: true,
				freelancer: true,
			},
		});
		const hashedPassword = await bcrypt.hash(password, 10);
		user.password = hashedPassword
		await prisma.user.update({
			where: { id: decoded.id },
			data: { password: hashedPassword },
		});
		return res
			.status(200)
			.json({ message: "Password Updated, login with new Password!" });
	} catch (error) {
		console.log(error);
	}
};
export { resetPass };

import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();

const login = async (req, res) => {
	const { identifier, password } = req.body;
	if (!identifier || !password)
		return res
			.status(400)
			.json({
				errorMessage:
					"Enter either email or username and password to login",
			});
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
			.status(401)
			.json({ message: "Username or Email not registered" });
	try {
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (passwordMatch) {
			const payload = {
				id: user.id,
				role: user.role,
			};
			const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
				expiresIn: "1d",
			});
			return res
				.status(202)
				.json({ message: "Logged in successfully", token });
		} else
			return res
				.status(400)
				.json({ errorMessage: "Password Incorrect!" });
	} catch (error) {
		console.log(error);
	}
};
export { login };

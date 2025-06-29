import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const register = async (req, res) => {
	const { username, email, password, role } = req.body;
	// If no username or email
	if (!username || !email)
		return res
			.status(400)
			.json({ errorMessage: "Email or Username are empty" });
	// Checking if user exist or a fresh register
	const user = await prisma.user.findFirst({
		where: {
			OR: [{ email: email }, { username: username }],
		},
		include: {
			client: true,
			freelancer: true,
		},
	});
    if (user) return res.status(400).json({ errorMessage: "UserExist" });
	// Checking validity of password
	const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(
		password
	);
	if (password.length < 8 || !isValid)
		return res
			.status(400)
			.json({
				errorMessage:
					"Password must contain lowercase, uppercase, one digit and atleast one special character and length should be minimum 8 characters!",
			});
	// Hashing Password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	try {
		if (!user) {
			const newUser = await prisma.user.create({
				data: {
					username,
					email,
					password: hashedPassword,
					role,
				},
			});
			if (role == "CLIENT") {
				const { companyName } = req.body;
				const client = await prisma.client.create({
					data: {
						userId: newUser.id,
						companyName: companyName || null,
					},
				});
				return res.status(200).json({ message: "Client Registered" });
			} else if (role == "FREELANCER") {
				const { bio, skills } = req.body;
				// if(!githubId) return res.status(400).json({errorMessage: "GithubId is required"})
				// const response
				const freelancer = await prisma.freelancer.create({
					data: {
						userId: newUser.id,
						bio,
						skills,
					},
				});
				return res
					.status(200)
					.json({ message: "FreeLancer Registered" });
			}
		}
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ errorMessage: "Server error. Please try again." });
	}
};

export { register };

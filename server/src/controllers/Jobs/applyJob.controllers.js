import express from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const prisma = new PrismaClient()

const applyJob = async(req, res)=>{
    const { coverLetter, proposedBudget, duration } = req.body
    const { id:jobId } = req.params
    if(!jobId) return res.status(400).json({message: "JobId does not exist!"})
    const {id} = req.user
    
    try {
        
        const applicationExist = await prisma.application.findFirst({
            where: {freelancerId : id, jobId},
            include: {
                freelancer : true
            }
        })
        if(applicationExist) return res.status(400).json({message: "Application already Exist!"})
        await prisma.application.create({
            data: {
                coverLetter,
                proposedBudget : parseInt(proposedBudget, 10),
                duration: parseInt(duration, 10),
                jobId,
                freelancerId: id
            }
        })
        return res.status(200).json({message: "Application Sent Successfully!"})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error!"})
    }

}
export {applyJob}
import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const declineApplication = async (req, res)=>{
    try {
        const {applicationId} = req.params
    await prisma.application.update({
        where: {id: applicationId},
        data: {status: "REJECTED"}
    })
    return res.status(200).json({message: "Application Rejected"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error!"})
    }
}
export {declineApplication}
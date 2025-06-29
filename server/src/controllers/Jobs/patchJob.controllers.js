import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const partialEdit = async(req, res)=>{
    const {id} = req.params
    const {updateData} = req.body

    try {
    const updatedJob = await prisma.job.update({
      where: { id },
      data: updateData,
    });

    return res.status(200).json({ message: "Job updated", job: updatedJob });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update job" });
  }
}
export {partialEdit}
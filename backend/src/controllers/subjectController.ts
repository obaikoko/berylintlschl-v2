import asyncHandler from "express-async-handler";
import { subjectSchema } from "../validators/subjectValidator";
import { prisma } from "../config/db/prisma";
import { Request, Response } from "express";

const createSubject = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const validateData = subjectSchema.parse(req.body);

    //   Check if subject already exist

    const subjectExist = await prisma.subject.findFirst({
      where: {
        name: validateData.name,
      },
    });

    if (subjectExist) {
      res.status(400);
      throw new Error("Subject already exist");
    }

    await prisma.subject.create({
      data: validateData,
    });

    res.status(201).json(`${validateData.name} added successfully to subjects`);
  }
);

const getSubjects = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const subjects = await prisma.subject.findMany({
      orderBy: { name: "asc" },
    });
    res.json(subjects);
  }
);

const deleteSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //   Check if subject exist
  const subjectExist = await prisma.subject.findFirst({
    where: {
      id,
    },
  });

  if (!subjectExist) {
    res.status(404);
    throw new Error("Subject already exist");
  }
  await prisma.subject.delete({
    where: { id },
  });

  res.json(`${subjectExist.name} removed from subjects`);
});

export { createSubject, getSubjects, deleteSubject };

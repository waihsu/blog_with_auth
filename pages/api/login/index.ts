import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(401).json({ messg: "All Fields must be fill" });
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) return res.status(401).json({ messg: "User Not Found" });
      const hashedPassword = user?.password;
      const isCorrectPassword = await bcrypt.compare(
        password,
        hashedPassword as string
      );
      if (isCorrectPassword) {
        const accessToken = jwt.sign(
          user as object,
          process.env.JWT_SECRET as string
        );
        res.status(200).json({ messg: "success", accessToken });
      }
      res.status(200).json({ messg: "Wrong Password" });
    } catch (error) {
      res.status(401).json({ error });
    }
  }
}

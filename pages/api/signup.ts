import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, name, username, password } = req.body;

  if (req.method === "POST") {
    if (!email || !name || !username || !password)
      return res.status(401).json({ messg: "All fields need to fill" });

    //hashedPassword
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!userExist) {
      const user = await prisma.user.create({
        data: {
          email: email,
          username: username,
          name: name,
          password: hashedPassword,
        },
      });
      res.status(200).json({ messg: "created", user });
    }
    res.status(401).json({ messg: "user already exists" });
  }
}

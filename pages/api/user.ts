// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../lib/prisma";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ messg: "You must be logged in." });
  }
  try {
    if (req.method === "GET") {
      const email = req.query.email as string;

      const currentUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!currentUser) {
        return res.status(401).json({ messg: "user not found" });
      }
      res.status(200).json({ user: currentUser });
    }
    if (req.method === "POST") {
      const email = req.body.email as string;
      if (email) {
        const currentUser = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (!currentUser) {
          const user = await prisma.user.create({
            data: req.body,
          });
          return res.status(200).json({ messg: "success", user });
        } else {
          const user = await prisma.user.update({
            where: {
              email: email,
            },
            data: req.body,
          });
          res.status(200).json({ messg: "user updated" });
        }
        res.status(401).json({ messg: "no email" });
      }
    }
  } catch (error) {
    res.status(401).json(error);
  }
}

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
    // POST METHOD
    if (req.method === "POST") {
      const post = await prisma.post.create({
        data: req.body,
      });
      res.status(200).json({ messg: "done", post });
      return;
    }

    // GET Method
    if (req.method === "GET") {
      const posts = await prisma.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      let userData = [];
      for (let i = 0; i < posts.length; i++) {
        const user = await prisma.user.findUnique({
          where: {
            email: posts[i].userEmail,
          },
        });
        userData.push(user);
      }
      res.status(200).json({ posts, userData });
    }
    res.status(200).json({ messg: "incorrect" });
  } catch (error) {
    res.status(401).json({ error });
  }
}
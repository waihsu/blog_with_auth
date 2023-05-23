import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ messg: "You must be logged in." });
  }

  // POST METHOD
  if (req.method === "POST") {
    const blogPost = JSON.parse(req.body);
    // console.log(blogPost);
    const post = await prisma.post.create({
      data: blogPost,
    });
    res.status(200).json({ messg: "done" });
  }

  res.status(200).json({ messg: "incorrect" });
}

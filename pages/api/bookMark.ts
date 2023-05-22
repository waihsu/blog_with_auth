import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ messg: "You must be logged in." });
  }

  if (req.method === "POST") {
    const post = await prisma.post.update({
      where: {
        id: req.body.id,
      },
      data: {
        bookmarkedUserEmails: req.body.bookmarkedUserEmails,
      },
    });
    res.status(200).json({ messg: "done", post });
  }
  res.status(401).json({ messg: "wrong" });
}

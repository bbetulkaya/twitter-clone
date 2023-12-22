import { getServerSession } from "next-auth";
import { initMongoose } from "../../../lib/mongoose";
import { authOptions } from "./auth/[...nextauth]";
import Post from "../../../models/Post";

export default async function handler(req, res) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    const { text } = req.body;
    const post = await Post.create({
      author: session.user.id,
      text,
    });
    
    res.status(201).json(post); // Respond with the created post
  } else {
    res.status(405).end(); // Method Not Allowed if not a POST request
  }
}

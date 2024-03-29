import { getServerSession } from "next-auth";
import { initMongoose } from "../../../lib/mongoose";
import { authOptions } from "./auth/[...nextauth]";
import Post from "../../../models/Post";
import Like from "../../../models/Like";

export default async function handler(req, res) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    const { text, parent } = req.body;
    const post = await Post.create({
      author: session.user.id,
      text,
      parent,
    });
    if (parent) {
      const parentPost = await Post.findById(parent);
      parentPost.commentsCount = await Post.countDocuments({ parent });
      await parentPost.save();
      console.log(parentPost.commentsCount);
    }
    res.status(201).json(post); // Respond with the created post
  }

  if (req.method === "GET") {
    const { id } = req.query;
    if (id) {
      const post = await Post.findById(id).populate("author");
      res.json({ post });
    } else {
      const parent = req.query.parent || null;
      const author = req.query.author;
      const searchFilter = author ? { author } : { parent };
      const posts = await Post.find(searchFilter)
        .populate("author")
        .sort({ createdAt: -1 })
        .limit(20)
        .exec();
      const postsLikedByMe = Like.find({
        author: session?.user.id,
        post: posts.map((p) => p._id),
      });
      const idsLikedByMe = (await postsLikedByMe).map((like) => like.post);
      res.json({ posts, idsLikedByMe });
    }
  }
}

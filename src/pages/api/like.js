import { getServerSession } from "next-auth";
import { initMongoose } from "../../../lib/mongoose";
import { authOptions } from "./auth/[...nextauth]";
import Like from "../../../models/Like";
import Post from "../../../models/Post";

async function updateLikesCount(postId) {
  const likesCount = await Like.countDocuments({ post: postId });

  await Post.findByIdAndUpdate(
    postId,
    { likesCount: likesCount },
    { new: true } // Ensure you get the updated document
  );
}

export default async function handler(req, res) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);

  const postId = req.body.id;
  const userId = session.user.id;
  const existingLike = await Like.findOne({ author: userId, post: postId });

  if (existingLike) {
    await existingLike.deleteOne();
    await updateLikesCount(postId);
    res.json(null);
  } else {
    const like = await Like.create({ author: userId, post: postId });
    await updateLikesCount(postId);
    res.json({ like });
  }
}

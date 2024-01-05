import multiparty from "multiparty";
import S3Client from "aws-sdk/clients/s3";
import fs from "fs";
import { initMongoose } from "../../../lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import User from "../../../models/User";

export default async function handler(req, res) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);

  const s3Client = new S3Client({
    region: "eu-west-3",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  const form = new multiparty.Form({ uploadDir: "./public" });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: "Error parsing form data" });
      return;
    }
    const type = Object.keys(files)[0];
    const fileInfo = files[type][0];
    const fileName = fileInfo.path.split("\\")[1];
    s3Client.upload(
      {
        Bucket: "betul-twitter-clone",
        Body: fs.readFileSync(fileInfo.path),
        ACL: "public-read",
        Key: fileName,
        ContentType: fileInfo.headers["content-type"],
      },
      async (err, data) => {
        const user = await User.findByIdAndUpdate(session.user.id, {
          [type]: data.Location,
        });
        fs.unlinkSync(fileInfo.path);
        res.json({ err, data, fileInfo, src: data.Location });
      }
    );
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

import mongoose, { Document, Model } from "mongoose";
import ProfilePhoto from "./../components/shared/ProfilePhoto";
import { IUser } from "./user.model";
import {  ICommentDocument } from "./comment.model";
export interface IPost {
  description: string;
  user: IUser;
  imageUrl?: string;
  likes?: string[];
  comments?: ICommentDocument[];
}
export interface IPostDocument extends IPost, Document {
  createdAt: Date;
  updatedAt: Date;
  _id:string;
}
const postSchema = new mongoose.Schema<IPostDocument>(
  {
    description: {
      type: String,
      required: true,
    },
    user: {
      userId: {
        type: String,
        required: true,
      },
      profilePhoto: {
        type: String,
        require: true,
      },
      firstName: {
        type: String,
        require: true,
      },
      lastName: {
        type: String,
        require: true,
      },
    },
    imageUrl: {
      type: String,
      default: "",
    },
    likes: {
      type: [String],
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);
export const Post: Model<IPostDocument> =
  mongoose.models?.Post || mongoose.model<IPostDocument>("Post", postSchema);

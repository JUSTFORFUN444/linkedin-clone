"use server";

import { Post } from "@/models/post.model";
import { IUser } from "@/models/user.model";
import { currentUser } from "@clerk/nextjs/server";

import { v2 as cloudinary } from "cloudinary";
import connectDB from "./db";
import { revalidatePath } from "next/cache";

import { Comment } from './../models/comment.model';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
//creating post using server acions

export const createPostAction = async (
  inputText: string,
  selectedFile: string
) => {
  await connectDB();
  const user = await currentUser();
  if (!user) throw new Error("user not authenticated");
  if (!inputText) throw new Error("Input field is required");

  const image = selectedFile;

  const userDatabase: IUser = {
    firstName: user.firstName || "vraj",
    lastName: user.lastName || "jariwala",
    userId: user.id,
    profilePhoto: user.imageUrl,
  };
  let uploadResponse;
  try {
    if (image) {
      //1.create post with image
      uploadResponse = await cloudinary.uploader.upload(image);

      await Post.create({
        description: inputText,
        user: userDatabase,
        imageUrl:uploadResponse.secure_url //cloudinary
      });
    } else {
      //2.create post with text only
      await Post.create({
        description: inputText,
        user: userDatabase,
      });
    }
    revalidatePath("/");
  } catch (error:any) {
    throw new Error(error);
  }
}

// get all post using serveraction
 
export const getAllPosts =  async () =>{
  await connectDB();
  try {
    const posts = await Post.find().sort({createdAt:-1}).populate({path:'comments', options:{sort:{createdAt:-1}}});
    if(!posts) return [];
    return JSON.parse(JSON.stringify(posts));
     } catch (error) {
    console.log(error)
  }
}

//delete post by id

export const deletePostAction = async (postId:string) => {
await connectDB();
const user = await currentUser();
if(!user) throw new Error('user not authenticated.');
const post = await Post.findById(postId);
if(!post) throw new Error('post not found');

//delete post only if yours

if(post.user.userId !== user.id ){
  throw new  Error('you are not an owner of this post.');
}
try {
  await Post.deleteOne({_id:postId})
  revalidatePath("/");
} catch (error:any) {
  throw new Error('an error occured', error)
  
}
}
//change sinid Id
export const createCommentAction = async (postId:string, formData:FormData) => {
  try {
    const user = await currentUser();
    if(!user) throw new Error('user not authenticated');
    const inputText =  formData.get('inputText') as string;
    if(!inputText) throw new Error('field is required');
    if(!postId) throw new Error('post id required');

    const userDatabase: IUser = {
      firstName: user.firstName || "vraj",
      lastName: user.lastName || "jariwala",
      userId: user.id,
      profilePhoto: user.imageUrl,
    }
    const post= await Post.findById({_id:postId});
    if(!post) throw new Error('post not found');
   
    const comment:any = await Comment.create({  //any 
   textMessage:inputText,
   user:userDatabase,
    });

    post.comments?.push(comment._id);
    await post.save();
    revalidatePath("/");
  } catch (error) {
    throw new Error('An Error Occured');
  }

}


import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

// post dislikes
export const POST = async (req:NextRequest, {params}:{params:{postid:string}}) => {
    try {
        await connectDB();
        const userId = await req.json();
        const post = await Post.findById({_id:params.postid});
        if(!post) return NextResponse.json({error:'Post not found.'});
        await post.updateOne({$pull:{likes:userId}});
        return NextResponse.json({message:"Post disliked successfully."});
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({error:'An error occurred.'});
    }
}

import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Post } from '@/models/post.model';
import { error } from "console";
// get likes
export const GET = async (_req:NextRequest,{params}: {params:{postid:string}}) => {
try {
    await connectDB();
    const post = await Post.findById({_id:params.postid});
    if(!post) return NextResponse.json({error:'post not found.'});
    return NextResponse.json(post.likes);
} catch (error:any) {
    return NextResponse.json({error:'An error occurred.'});
}
}
// post likes
export const POST = async (req:NextRequest, {params}:{params:{postid:string}}) => {
    try {
        await connectDB();
        const userId = await req.json();
        const post = await Post.findById({_id:params.postid});
        if(!post) return NextResponse.json({error:'Post not found.'});
        await post.updateOne({$addToSet:{likes:userId}});
        return NextResponse.json({message:"Post liked successfully."});
    } catch (error:any) {
        return NextResponse.json({error:'An error occurred.'});
    }
}

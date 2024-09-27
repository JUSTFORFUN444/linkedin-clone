import React from "react";
import PostInput from "./PostInput";
import Posts from "./Posts";
import { getAllPosts } from "@/lib/serveractions";
import { IUser } from "@/models/user.model";

const Feed = async ({ user }: { user: IUser | null }) => {
  const userData = user? JSON.parse(JSON.stringify(user)) : null;
  const posts = await getAllPosts();
  return (
    <div className="flex-1">
      {userData && <PostInput user={userData} />}
      <Posts posts = {posts!}/>
    </div>
  );
};

export default Feed;

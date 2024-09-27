
import Feed from "@/components/Feed";
import News from "@/components/News";
import Sidebar from "./../components/Sidebar";

import { currentUser } from "@clerk/nextjs/server";
import { IUser } from "@/models/user.model";


export default async function Home() {
  const user = await currentUser();
// Check if user is null and handle accordingly
const userData: IUser | null = user ? JSON.parse(JSON.stringify(user)) : null;

  // console.log(user);
  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto  flex justify-between gap-8">
        {/* sidebar */}
        <Sidebar user = {user}/>
        {/* feed  */}
        <Feed   user = {userData}/>
        {/* news */}
        <News />
      </div>
    </div>
  );
}

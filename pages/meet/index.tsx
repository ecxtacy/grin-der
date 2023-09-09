import Fields from "@/interfaces/field";
import { NextPage } from "next";
import axios from "axios";
import Button from "@/components/ui/button";
import { io } from "socket.io-client";

interface MeetPageProps {}

// fake user data for simulation
const currentUserData = {
  id: "ckvxm8 ju3",
  username: "monark",
  age: 19,
  fields: [Fields.WEB_DEV, Fields.APP_DEV],
};

const MeetPage: NextPage<MeetPageProps> = () => {
  const handleClick = async () => {
    const resp = await axios.get(
      `http://localhost:6969/meet?id=${currentUserData.id}`
    );
    console.log(resp);

    const socket = io("http://localhost:6969");
    socket.emit("join-room", "room_id", "user_id");
  };

  const listActiveUsers = async () => {
    const resp = await axios.get(`http://localhost:6969/live_users`);
    console.log(resp.data);
  };
  return (
    <div>
      <h1 className="text-7xl my-8 text-center mx-auto">MeetPage</h1>

      <div className="max-w-5xl p-6 rounded-3xl border flex flex-col gap-8 border-black mx-auto">
        <Button className="mx-auto" variant="primary" onClick={handleClick}>
          meetup
        </Button>
        {/* <Button onClick={listActiveUsers}>show active users</Button> */}

        <div className="h-96 w-[44rem] border border-gray-400 rounded-xl mx-auto"></div>
      </div>
    </div>
  );
};

export default MeetPage;

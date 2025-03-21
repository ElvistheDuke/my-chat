import React, { useEffect, useState } from "react";
import {
  addDoc,
  serverTimestamp,
  collection,
  query,
  where,
  onSnapshot,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

interface Props {
  room: string | null;
}
interface MessagesArray {
  id?: string;
  text?: string;
  room?: string;
  user?: string;
  createdAt?: Timestamp;
}

function Chat(props: Props) {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<MessagesArray[]>([]);

  const messageRef = collection(db, "messages");

  useEffect(() => {
    if (!props.room) return;
    const queryMessage = query(
      messageRef,
      where("room", "==", props.room),
      orderBy("createdAt")
    );

    const unsuscribe = onSnapshot(queryMessage, (snapshot) => {
      // const messagesSnap: MessagesArray[] = [];
      // snapshot.forEach((doc) => {
      //   messagesSnap.push({ ...doc.data(), id: doc.id });
      // });
      // console.log(messagesSnap);
      // setMessages(messagesSnap);

      const fetchedMessages: MessagesArray[] = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMessages(fetchedMessages);
    });

    return () => unsuscribe();
  }, [props.room, messageRef]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage == "") {
      return;
    }

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser?.displayName,
      room: props.room,
    });

    setNewMessage("");
  };

  return (
    <div className="bg-white mx-auto max-w-4xl rounded-2xl">
      <div className="flex flex-col justify-center items-center py-4">
        <p className="text-sm">Room Name</p>
        <p className="text-4xl font-bold">{props.room}</p>
      </div>
      <div className="p-12 pt-2 flex flex-col max-h-[60vh] overflow-y-scroll">
        {messages.map((message) => {
          return (
            <div
              className={
                message.user == auth.currentUser?.displayName
                  ? "flex mb-2 justify-end"
                  : "flex mb-2 "
              }
              key={message.id}
            >
              <div className="bg-blue-500 max-w-[60%] px-4 py-2 rounded-2xl text-white">
                <p className="text-xs">{message.user}</p>
                <p className="font-semibold">{message.text}</p>
                <p className="text-xs">
                  {message.createdAt?.toDate().toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center">
          <div className="flex w-[90%] mb-4">
            <input
              className="flex-1 border-2 py-2 px-4 rounded-tl border-blue-500 outline-0 rounded-bl"
              placeholder="Enter Message Here"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
            <button
              className="cursor-pointer bg-blue-500 text-white px-4 rounded-br rounded-tr"
              type="submit"
            >
              Send Message
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Chat;

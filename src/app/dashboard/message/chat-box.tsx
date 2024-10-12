import React, { useEffect, useState, useRef } from "react";
import { useChannel, useAbly } from "ably/react";
import { SendIcon } from "lucide-react";
import { resizeBase64Img } from "@/lib/utils";

interface Group {
  _id: string;
  name: string;
}

interface Message {
  connectionId: string;
  name: string;
  image: string;
  data: string;
  timestamp: string;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  photo: string;
}

function ChatBox(): JSX.Element {
  const ably = useAbly();
  const [groups, setGroups] = useState<Group[]>([]);
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const [messageText, setMessageText] = useState<string>("");
  const [receivedMessages, setMessages] = useState<Message[]>([]);
  const [user_, setUser_] = useState<User | null>(null);
  const channelName = "chat-demo1";


  const { channel } = useChannel(channelName, (message: any) => {
    if (currentGroup && message.data.group === currentGroup._id) {
      setMessages((prevMessages) => [...prevMessages, message.data as Message]);
    }
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [receivedMessages]);



  const handleJoinGroup = async (groupId: string) => {
    const selectedGroup = groups.find((group) => group._id === groupId);
    if (selectedGroup) {
      setCurrentGroup(selectedGroup);
      setMessages([]); // Clear messages when joining a new group
    }
  };

  const sendChatMessage = async (messageText: string) => {
    try {
      if (currentGroup && channel && user_) {
        const resizedImage = await resizeBase64Img(user_.photo, 100, 100);

        const message = {
          group: currentGroup._id,
          name: `${user_.firstName} ${user_.lastName}`,
          image: resizedImage,
          data: messageText,
          timestamp: new Date().toISOString(),
          connectionId: ably.connection.id,
        };

        await channel.publish("chat-message", message);
        await addMessageToGroup(currentGroup._id, user_._id, messageText);

        setMessageText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const renderedMessages = receivedMessages.map((message, index) => {
    const isMe = message.connectionId === ably.connection.id;
    return (
      <div
        key={index}
        className={`flex  ${isMe ? "justify-end" : "justify-start"} mb-4`}
      >
        <div
          className={`max-w-xs rounded-lg border p-4 dark:border-graydark ${
            isMe
              ? "bg-primary text-white shadow-md"
              : "bg-gray-200 dark:bg-gray-700 shadow-sm"
          }`}
        >
          <div className="mb-2 flex items-center">
            <img
              src={message.image || "/default-avatar.png"}
              alt={message.name}
              className="mr-2 h-8 w-8 rounded-full"
            />
            <span className="text-sm ">{message.name}</span>
          </div>
          <p className="text-xs">{message.data}</p>
          <span className="text-gray-400 text-xs">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
    );
  });

  return (
    <div className="container mx-auto h-screen p-4">
      <h1 className="mb-6 text-3xl text-black dark:text-white">
        Drug Discovery Chat
      </h1>

      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <input
          type="text"
          placeholder="Create new group"
          className="w-full rounded-lg border border-stroke bg-white p-4 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") createGroup(e.currentTarget.value, user_?._id || "");
          }}
        />
        <div className="relative w-full">
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleJoinGroup(e.target.value)}
            className="w-full rounded-lg border border-stroke bg-white p-4 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            <option value="">Join a group</option>
            {groups.map((group) => (
              <option key={group._id} value={group._id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {currentGroup && (
        <div className="rounded-lg border border-stroke p-6 dark:border-form-strokedark dark:bg-form-input">
          <h2 className="mb-4 text-xl text-black dark:text-white">
            Current Group: {currentGroup.name}
          </h2>
          <div className="dark:bg-gray-900 mb-4 h-64 overflow-y-auto rounded-lg bg-white p-4">
            {renderedMessages.length > 0 ? (
              <>
                {renderedMessages}
                <div ref={bottomRef}></div>
              </>
            ) : (
              <p className="text-gray-500">
                No messages yet. Start chatting!
              </p>
            )}
          </div>
          <form onSubmit={handleFormSubmission} className="flex space-x-4">
            <input
              type="text"
              value={messageText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageText(e.target.value)}
              placeholder="Type a message..."
              className="w-full rounded-lg border border-stroke bg-white p-4 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <button
              type="submit"
              disabled={!messageText.trim()}
              className="disabled:bg-gray-400 flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed"
            >
              <SendIcon className="mr-2" />
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
function createGroup(groupName: string, _id: string) {
  throw new Error("Function not implemented.");
}

function addMessageToGroup(_id: string, _id1: string, messageText: string) {
  throw new Error("Function not implemented.");
}

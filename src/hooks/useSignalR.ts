import React, { useEffect, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

// const SIGNALR_HUB_URL = "https://localhost:7264/hub"; // Replace this with your actual hub URL

const SIGNALR_HUB_URL = "https://edumanagement-api.azurewebsites.net/hub"; // Replace this with your actual hub URL

interface Message {
  userId: string;
  content: string;
}

export const useSignalR = (discussionId: number) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const connectionRef = React.useRef<HubConnection | null>(null);
  const [hasNewMessages, setHasNewMessages] = useState(false);

  useEffect(() => {
    // Create the SignalR connection
    const newConnection = new HubConnectionBuilder()
      .withUrl(SIGNALR_HUB_URL)
      .build();

    // Store the connection in a ref to prevent re-initialization on every render
    connectionRef.current = newConnection;

    setConnection(newConnection); // Set up cleanup function
    return () => {
      // When the component unmounts, stop the connection and clean up
      if (
        connectionRef.current &&
        connectionRef.current.state !== "Disconnected"
      ) {
        connectionRef.current
          .stop()
          .then(() => console.log("SignalR connection stopped."))
          .catch((error) =>
            console.error("Error stopping SignalR connection: ", error)
          );
      }
    };
  }, []);

  useEffect(() => {
    if (connection) {
      // Define the function to handle incoming messages
      const handleReceiveMessage = (userId: string, content: string) => {
        // Process the message and update the state with new messages
        setMessages((prevMessages) => [...prevMessages, { userId, content }]);
        setHasNewMessages(true);
      };

      // Start the SignalR connection
      connection
        .start()
        .then(() => {
          console.log("SignalR connection established.");
          // Join the discussion group (hub group)
          connection.invoke("JoinDiscussionGroup", discussionId);
        })
        .catch((error) =>
          console.error("Error connecting to SignalR hub: ", error)
        );

      // Subscribe to the "ReceiveMessage" event to handle incoming messages
      connection.on("ReceiveMessage", handleReceiveMessage);

      // Return a cleanup function to unsubscribe from the "ReceiveMessage" event
      return () => {
        connection.off("ReceiveMessage", handleReceiveMessage);
      };
    }
  }, [connection, discussionId]);

  const sendMessage = (content: string) => {
    if (connection) {
      // Send a message to the hub
      connection
        .invoke("SendMessage", discussionId, content)
        .catch((error) => console.error("Error sending message: ", error));
    }
  };

  return { connection, setConnection, messages, sendMessage, hasNewMessages, setHasNewMessages };
};

import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

const startConnection = (token: string): HubConnection => {
  const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:7264/discussion-hub", {
      accessTokenFactory: () => token,
    })
    .withAutomaticReconnect()
    .build();

  connection
    .start()
    .then(() => {
      console.log("Connected!");
    })
    .catch((error) => {
      console.log("Connection failed: ", error);
    });

  return connection;
};

const stopConnection = (connection?: HubConnection) => {
  if (connection) {
    connection
      .stop()
      .then(() => {
        console.log("Connection stopped!");
      })
      .catch((error) => {
        console.log("Error while stopping connection: ", error);
      });
  }
};

const sendMessage = async (connection?: HubConnection, message?: string) => {
  if (connection) {
    try {
      await connection.send("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  } else {
    alert("No connection to server yet.");
  }
};

const sendToSpecificUser = async (
  connection?: HubConnection,
  userId?: string,
  message?: string
) => {
  if (connection) {
    try {
      await connection.send("SendToSpecificUser", userId, message);
    } catch (e) {
      console.log(e);
    }
  } else {
    alert("No connection to server yet.");
  }
};

export { startConnection, stopConnection, sendMessage, sendToSpecificUser };

import { Stack, useMediaQuery, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "../Sidebar/Sidebar";
import Chat from "../Chat/Chat";
import Dashboard from "../Layout/Dashboard";
import API_CONSTANTS from "../../utils/api";
import { ChatProvider } from "../../providers/ChatProvider";

const ChatScreen = () => {
  const [isResponsive] = useMediaQuery("(max-width: 800px)");
  const [repoName, setRepoName] = useState("");
  const [activeComponent, setActiveComponent] = useState("chat");

  // Function to change active component
  const switchComponent = (componentName) => {
    setActiveComponent(componentName);
  };

  useEffect(() => {
    axios
      .post(`${API_CONSTANTS.API_URL}${API_CONSTANTS.REPO_NAME}`)
      .then((response) => {
        setRepoName(response.data);
        console.log("Repository data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching repository data:", error);
      });
  }, []);

  return (
    <ChatProvider>
      <Stack
        direction={!isResponsive ? "row" : "column"}
        width="full"
        height="full"
        spacing={0}
      >
        {/* Sidebar configuration */}
        <Sidebar
          repoName={repoName}
          isResponsive={isResponsive}
          switchComponent={switchComponent}
        />

        <Box flex="1" overflowY="auto" height="100vh">
          {activeComponent === "chat" ? <Chat /> : <Dashboard />}
        </Box>
      </Stack>
    </ChatProvider>
  );
};

export default ChatScreen;

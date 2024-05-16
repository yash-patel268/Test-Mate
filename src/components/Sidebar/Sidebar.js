import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import {
  Badge,
  Button,
  Divider,
  Heading,
  IconButton,
  Spacer,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import {
  FiExternalLink,
  FiMenu,
  FiMessageSquare,
  FiPlus,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { motion } from "framer-motion";

import { useChat } from "../../providers/ChatProvider";
import API_CONSTANTS from "../../utils/api";

const Sidebar = ({ switchComponent, isResponsive, ...props }) => {
  const [isOpen, setIsOpen] = useState(true),
    handleOpen = () => setIsOpen(true),
    handleClose = () => setIsOpen(false);

  let name = props.repoName || <Spinner />;
  let chat = [{ id: 1, role: name }];

  let selectedChat = chat[0];

  const [listRef] = useAutoAnimate();

  let { colorMode } = useColorMode();

  const { addMessage, clearMessages } = useChat();

  const clearConversation = () => {
    axios
      .post(`${API_CONSTANTS.API_URL}${API_CONSTANTS.CLEAR_CONVERSATION}`)
      .then((response) => {
        clearMessages();
      })
      .catch((error) => {
        addMessage({
          emitter: "gpt",
          message: "Sorry, I'm having trouble clearing your conversation.",
        });
      });
  };

  let responsiveProps = isResponsive
    ? {
        position: "fixed",
        left: isOpen ? 0 : "-100%",
        top: 0,
      }
    : {};

  return (
    <>
      {!!isResponsive && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding={2}
        >
          <IconButton
            aria-label="menu"
            icon={<FiMenu />}
            onClick={handleOpen}
          />
          <Heading size="md">TestMate</Heading>
          <IconButton
            aria-label="add"
            icon={<FiPlus />}
            onClick={() => console.log("add")}
          />
        </Stack>
      )}
      {!!isOpen && (
        <Stack
          as={motion.div}
          width="full"
          height="full"
          position="absolute"
          top={0}
          left={0}
          transition="all ease .5s"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
        />
      )}
      <Stack
        maxWidth="325px"
        width="full"
        height="full"
        padding={2}
        color="white"
        backgroundColor={colorMode === "dark" ? "#171717" : "#F9F9F9"}
        zIndex={1}
        transition="all ease .5s"
        {...responsiveProps}
      >
        {!!isResponsive && (
          <IconButton
            aria-label="close button"
            icon={<FiX />}
            position="absolute"
            right={0}
            transform={"translateX(125%)"}
            colorScheme="red"
            backgroundColor="gray.800"
            color="white"
            onClick={handleClose}
          />
        )}

        <Stack height="full" overflowY="auto" ref={listRef}>
          {chat.map(({ id, role }) => {
            return (
              <Button
                id={id}
                key={id}
                cursor="pointer"
                borderRadius={15}
                leftIcon={() => {
                  return (
                    <div
                      style={{
                        borderRadius: "50%",
                      }}
                    >
                      <FiMessageSquare />
                    </div>
                  );
                }}
                justifyContent="flex-start"
                padding={6}
                maxHeight="64px"
                height="full"
                marginBottom="3px"
                overflow="hidden"
                textOverflow="ellipsis"
                backgroundColor={
                  selectedChat?.id === id ? "#ffffff20" : "transparent"
                }
                onClick={() => console.log("select")}
                _hover={{
                  backgroundColor: "whiteAlpha.100",
                }}
                style={{
                  border: "1px solid #FFFFFF5C",
                }}
              >
                <Text>{role}</Text>
                <Spacer />
              </Button>
            );
          })}
        </Stack>
        <Divider marginY={2} borderColor="white" />
        <Stack>
          <Button
            leftIcon={<FiTrash2 />}
            justifyContent="flex-start"
            padding={2}
            backgroundColor="transparent"
            _hover={{
              backgroundColor: "blackAlpha.300",
            }}
            onClick={() => clearConversation()}
          >
            Clear conversation
          </Button>
          <Button
            leftIcon={<FiMessageSquare />}
            justifyContent="flex-start"
            padding={2}
            backgroundColor="transparent"
            _hover={{
              backgroundColor: "blackAlpha.300",
            }}
            onClick={() => switchComponent("chat")}
          >
            Chat
          </Button>
          <Button
            leftIcon={<FiExternalLink />}
            justifyContent="flex-start"
            padding={2}
            backgroundColor="transparent"
            _hover={{
              backgroundColor: "blackAlpha.300",
            }}
            onClick={() => switchComponent("dashboard")}
          >
            Dashboard
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Sidebar;

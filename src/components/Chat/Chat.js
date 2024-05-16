import { Avatar, IconButton, Spinner, Stack, Text } from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FiSend } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import axios from "axios";

import Instructions from "../Layout/Instructions";
import Input from "../Input/Input";
import gptAvatar from "../../assets/logo.webp";
import user from "../../assets/user.png";
import warning from "../../assets/warning.svg";
import API_CONSTANTS from "../../utils/api";
import { useChat } from "../../providers/ChatProvider";

const Chat = () => {
  const { messages, addMessage, clearMessages } = useChat();

  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleChange = (value) => {
    setInputValue(value);
  };

  useEffect(() => {
    updateScroll();
  }, [messages]);

  const overflowRef = useRef(null);
  const [parentRef] = useAutoAnimate();

  console.log(messages.length);

  const updateScroll = () => {
    overflowRef.current?.scrollTo(0, overflowRef.current.scrollHeight);
  };

  const makeRequest = (message) => {
    setIsLoading(true);
    const payload = {
      user_input: message,
    };

    axios
      .post(`${API_CONSTANTS.API_URL}${API_CONSTANTS.MESSAGE}`, payload)
      .then((response) => {
        const { data } = response;
        addMessage({ emitter: "gpt", message: data.output });
      })
      .catch((error) => {
        addMessage({
          emitter: "gpt",
          message: "Sorry, I'm having trouble right now.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Stack width="full" height="full">
      <Stack
        maxWidth="768px"
        width="full"
        marginX="auto"
        height="85%"
        overflow="auto"
        ref={overflowRef}
      >
        <Stack spacing={2} padding={2} ref={parentRef} height="full">
          {messages.length !== 0 ? (
            messages.map((content, key) => {
              const { emitter, message } = content;
              const getAvatar = () => {
                switch (emitter) {
                  case "gpt":
                    return gptAvatar;
                  case "error":
                    return warning;
                  default:
                    return user;
                }
              };

              const getMessage = () => {
                if (message.slice(0, 2) === "\n\n") {
                  return message.slice(2, Infinity);
                }

                return message;
              };

              return (
                <Stack
                  key={key}
                  direction="row"
                  padding={4}
                  rounded={8}
                  backgroundColor={
                    emitter === "gpt" ? "blackAlpha.200" : "transparent"
                  }
                  spacing={4}
                >
                  <Avatar name={emitter} src={getAvatar()} />
                  <Text
                    whiteSpace="pre-wrap"
                    marginTop=".75em !important"
                    overflow="hidden"
                  >
                    <ReactMarkdown>{getMessage()}</ReactMarkdown>
                  </Text>
                </Stack>
              );
            })
          ) : (
            <Instructions
              onClick={(text) => {
                const newMessage = {
                  emitter: "user",
                  message: text,
                };
                addMessage(newMessage);

                makeRequest(text);
                console.log("messages", messages);
              }}
            />
          )}
        </Stack>
      </Stack>
      <Stack
        height="20%"
        padding={4}
        backgroundColor="transparent"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
      >
        <Stack maxWidth="768px">
          <Input
            autoFocus={true}
            variant="filled"
            value={inputValue}
            onChange={handleChange}
            inputRightAddon={
              <IconButton
                aria-label="send_button"
                icon={!isLoading ? <FiSend /> : <Spinner />}
                backgroundColor="transparent"
                isDisabled={inputValue === ""}
                onClick={() => {
                  const newMessage = {
                    emitter: "user",
                    message: inputValue,
                  };
                  addMessage(newMessage);

                  makeRequest(inputValue);
                  setInputValue("");
                }}
              />
            }
            onSubmit={console.log("submit")}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isLoading) {
                if (inputValue === "") return;
                const newMessage = {
                  emitter: "user",
                  message: inputValue,
                };
                addMessage(newMessage);

                makeRequest(inputValue);
                setInputValue("");
              }
            }}
          />
          <Text textAlign="center" fontSize="sm" opacity={0.5}>
            TestMate is for personal use and educational purposes only. Our goal
            is to make AI systems more natural and safe to interact with.
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Chat;

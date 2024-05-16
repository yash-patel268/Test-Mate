import { Stack, Heading, Icon, Button, Text } from "@chakra-ui/react";
import { FiAlertTriangle, FiSun, FiZap } from "react-icons/fi";

const Instructions = ({ onClick }) => {
  const introdution = [
    {
      icon: FiSun,
      name: "Examples",
      list: [
        "List the top 10 contributors to the codebase in order?",
        "Summarize the purpose of the codebase?",
        "List the file types that are present?",
      ],
    },
    {
      icon: FiZap,
      name: "Capabilities",
      list: [
        "Remembers what user said earlier in the conversation",
        "Allows user to provide follow-up corrections",
        "Trained on a diverse range of data from the repository",
      ],
    },
    {
      icon: FiAlertTriangle,
      name: "Limitations",
      list: [
        "May occasionally generate incorrect information",
        "May occasionally produce harmful instructions or biased content",
        "Limited knowledge of world and events after 2021",
      ],
    },
  ];

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="full"
      overflow="auto"
    >
      <Heading size="lg" marginY={8}>
        TestMate
      </Heading>
      <Stack direction={["column", "column", "row"]}>
        {introdution.map(({ icon, list, name }, key) => {
          const handleClick = (text) => {
            if (name === "Examples") {
              return () => onClick(text);
            }
            return undefined;
          };

          return (
            <Stack key={key} alignItems="center">
              <Icon as={icon} />
              <Heading size="sm">{name}</Heading>
              {list.map((text, key) => (
                <Button
                  key={key}
                  maxWidth={64}
                  height="100px"
                  minWidth="60"
                  padding={4}
                  onClick={handleClick(text)}
                  style={{
                    cursor: name === "Examples" ? "pointer" : "default",
                  }}
                  _hover={
                    name === "Examples"
                      ? { bg: "blackAlpha.300", color: "white" }
                      : {}
                  }
                >
                  <Text overflow="hidden" whiteSpace="normal">
                    {text}
                  </Text>
                </Button>
              ))}
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Instructions;

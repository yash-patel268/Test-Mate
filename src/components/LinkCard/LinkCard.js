// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Portal,
  Spacer,
  Text,
  Card,
  CardBody,
} from "@chakra-ui/react";

import React from "react";
// react icons
import { FiSend } from "react-icons/fi";

const LinkCard = ({ title, description }) => {
  const overlayRef = React.useRef();
  return (
    <Card
      minHeight="290.5px"
      p="1rem"
      backgroundColor="rgba(255, 255, 255, 0.08)"
    >
      <CardBody
        p="0px"
        bgPosition="center"
        bgRepeat="no-repeat"
        w="100%"
        h={{ sm: "200px", lg: "100%" }}
        bgSize="cover"
        position="relative"
        borderRadius="15px"
      >
        <Box
          w="100%"
          position="absolute"
          h="inherit"
          borderRadius="inherit"
          ref={overlayRef}
        ></Box>
        <Portal containerRef={overlayRef}>
          <Flex
            flexDirection="column"
            color="white"
            p="1.5rem 1.2rem 0.3rem 1.2rem"
            lineHeight="1.6"
          >
            <Text fontSize="xl" fontWeight="bold" pb=".3rem">
              {title}
            </Text>
            <Text
              fontSize="sm"
              fontWeight="normal"
              w={{ lg: "92%" }}
              color="gray.400"
            >
              {description}
            </Text>
            <Spacer />
            <Flex align="center" mt={{ sm: "20px", lg: "40px", xl: "90px" }}>
              <Button
                p="0px"
                variant="no-hover"
                bg="transparent"
                mt="12px"
                as="a" // Renders the component as an anchor tag
                href="https://github.com/OpenLiberty/open-liberty"
              >
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  _hover={{ me: "4px" }}
                  transition="all .5s ease"
                  color={"white"}
                >
                  Learn more about Open Liberty
                </Text>
              </Button>
            </Flex>
          </Flex>
        </Portal>
      </CardBody>
    </Card>
  );
};

export default LinkCard;

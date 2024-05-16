import {
  Box,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  Td,
  Tr,
} from "@chakra-ui/react";
import React from "react";

function TimelineRow(props) {
  const { author, commits } = props;
  const textColor = useColorModeValue("gray.700", "white.300");
  const bgIconColor = useColorModeValue("white.300", "gray.700");

  return (
    <Tr>
      <Td pl="0px">
        <Text fontSize="md" pb=".1rem">
          {author}
        </Text>
      </Td>

      <Td>
        <Text fontSize="md" pb=".1rem">
          {commits}
        </Text>
      </Td>
    </Tr>
  );
}

export default TimelineRow;

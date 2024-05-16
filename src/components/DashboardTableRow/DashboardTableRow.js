import {
  Avatar,
  AvatarGroup,
  Flex,
  Icon,
  Progress,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function DashboardTableRow(props) {
  const { hash, date, message } = props;
  const formattedDate = new Date(date).toLocaleDateString("en-US");
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text fontSize="md" color={textColor} minWidth="100%">
            {hash}
          </Text>
        </Flex>
      </Td>

      <Td>
        <Text fontSize="md" color={textColor} pb=".1rem">
          {formattedDate}
        </Text>
      </Td>

      <Td>
        <Text fontSize="md" color={textColor} pb=".1rem">
          {message}
        </Text>
      </Td>
    </Tr>
  );
}

export default DashboardTableRow;

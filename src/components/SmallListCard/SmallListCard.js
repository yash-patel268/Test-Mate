// Chakra imports
import {
  Flex,
  Text,
  useColorModeValue,
  Card,
  Spinner,
  CardHeader,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
// Custom components

import TimelineRow from "../TimelineRow/TimelineRow";
import React from "react";

const SmallListCard = ({ title, amount, data }) => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card p="16px" maxH="100%" backgroundColor="rgba(255, 255, 255, 0.08)">
      <CardHeader p="12px 0px 28px 0px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
            {title}
          </Text>
        </Flex>
      </CardHeader>
      <Table variant="simple" color={textColor}>
        <Thead>
          <Tr my=".8rem" ps="0px">
            <Th color="gray.400" ps="0px">
              Author
            </Th>
            <Th color="gray.400">Commits</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.length === 0 && (
            <Tr>
              <Spinner />
            </Tr>
          )}
          {data.map((row) => {
            return (
              (
                <TimelineRow
                  key={row.totalCommits}
                  author={row.author}
                  commits={row.totalCommits}
                />
              ) || <Spinner />
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
};

export default SmallListCard;

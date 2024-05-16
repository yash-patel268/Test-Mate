// Chakra imports
import {
  Flex,
  Spinner,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Card,
  CardHeader,
} from "@chakra-ui/react";

import DashboardTableRow from "../DashboardTableRow/DashboardTableRow";
import React from "react";

const LargeListCard = ({ title, amount, captions, data }) => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card
      p="16px"
      overflowX={{ sm: "scroll", xl: "hidden" }}
      backgroundColor="rgba(255, 255, 255, 0.08)"
    >
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
            {captions.map((caption, idx) => {
              return (
                <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
                  {caption}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {data.length === 0 && (
            <Tr>
              <Spinner />
            </Tr>
          )}
          {data.map((row) => {
            console.log(row);
            return (
              <DashboardTableRow
                key={row.commitHash}
                hash={row.commitHash}
                date={row.dateOfCommit}
                message={row.commitMessage}
              />
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
};

export default LargeListCard;

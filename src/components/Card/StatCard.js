import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Card,
  CardBody,
} from "@chakra-ui/react";

import IconBox from "../IconBox/IconBox";

const StatCard = ({ title, amount, percentage, icon }) => {
  return (
    <Card minH="83px" backgroundColor="rgba(255, 255, 255, 0.08)">
      <CardBody>
        <Flex flexDirection="row" align="center" justify="center" w="100%">
          <Stat me="auto">
            <StatLabel
              fontSize="sm"
              color="gray.400"
              fontWeight="bold"
              pb=".1rem"
            >
              {title}
            </StatLabel>
            <Flex>
              <StatNumber fontSize="lg">{amount}</StatNumber>
            </Flex>
          </Stat>
          <IconBox as="box" h={"45px"} w={"45px"}>
            {icon}
          </IconBox>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default StatCard;

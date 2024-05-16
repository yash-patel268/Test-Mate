import { Flex, Grid, Image, SimpleGrid, Spinner } from "@chakra-ui/react";
import { VscFileSubmodule } from "react-icons/vsc";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoGitCommitSharp } from "react-icons/io5";
import { IoMdPricetags } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

import LinkCard from "../LinkCard/LinkCard";
import StatCard from "../Card/StatCard";
import InfoCard from "../InfoCard/InfoCard";
import gptAvatar from "../../assets/gpt-avatar.svg";
import LargeListCard from "../LargeListCard/LargeListCard";
import SmallListCard from "../SmallListCard/SmallListCard";
import API_CONSTANTS from "../../utils/api";

const Dashboard = () => {
  const [numberOfFiles, setNumberOfFiles] = useState(null);
  const [numberOfCommits, setNumberOfCommits] = useState(null);
  const [numberOfCommiters, setNumberOfCommiters] = useState(null);
  const [numberOfTags, setNumberOfTags] = useState(null);
  const [recentCommits, setRecentCommits] = useState([]);
  const [topCommiters, setTopCommiters] = useState([]);
  const [readmeContent, setReadmeContent] = useState("");

  useEffect(() => {
    axios
      .post(`${API_CONSTANTS.API_URL}${API_CONSTANTS.NUMBER_OF_FILES}`)
      .then((response) => {
        setNumberOfFiles(response.data);
        console.log("Repository data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching repository data:", error);
      });

    axios
      .post(`${API_CONSTANTS.API_URL}${API_CONSTANTS.NUMBER_OF_COMMITS}`)
      .then((response) => {
        setNumberOfCommits(response.data);
        console.log("Repository data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching repository data:", error);
      });

    axios
      .post(`${API_CONSTANTS.API_URL}${API_CONSTANTS.NUMBER_OF_COMMITERS}`)
      .then((response) => {
        setNumberOfCommiters(response.data);
        console.log("Repository data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching repository data:", error);
      });

    axios
      .post(`${API_CONSTANTS.API_URL}${API_CONSTANTS.NUMBER_OF_TAGS}`)
      .then((response) => {
        setNumberOfTags(response.data);
        console.log("Repository data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching repository data:", error);
      });

    axios
      .post(`${API_CONSTANTS.API_URL}${API_CONSTANTS.RECENT_COMMITS}`)
      .then((response) => {
        setRecentCommits(response.data);
        console.log("Repository data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching repository data:", error);
      });

    axios
      .post(`${API_CONSTANTS.API_URL}${API_CONSTANTS.TOP_COMMITERS}`)
      .then((response) => {
        setTopCommiters(response.data);
        console.log("Repository data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching repository data:", error);
      });
  }, []);

  return (
    <Flex
      marginLeft="25px"
      marginRight="25px"
      flexDirection="column"
      pt={{ base: "30px", md: "30px" }}
    >
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        <StatCard
          title={"Number of Files"}
          amount={numberOfFiles || <Spinner />}
          icon={<VscFileSubmodule height={24} />}
        />
        <StatCard
          title={"Number of Commits"}
          amount={numberOfCommits || <Spinner />}
          icon={<IoGitCommitSharp height={24} />}
        />
        <StatCard
          title={"Number of Commiters"}
          amount={numberOfCommiters || <Spinner />}
          icon={<BsFillPeopleFill height={24} />}
        />
        <StatCard
          title={"Number of Tags"}
          amount={numberOfTags || <Spinner />}
          icon={<IoMdPricetags height={24} />}
        />
      </SimpleGrid>
      <Grid
        templateColumns={{ md: "1fr", lg: "1.8fr 1.2fr" }}
        templateRows={{ md: "1fr auto", lg: "1fr" }}
        my="26px"
        gap="24px"
      >
        <InfoCard
          title={"Built by Developers"}
          name={"Built using OpenAI's GPT-4"}
          description={
            "An application integrating GPT-4 for intelligent bug detection and fixing advice within code repos, in the form of a conversational tool."
          }
          image={
            <Image
              src={gptAvatar}
              alt="chakra image"
              minWidth={{ md: "300px", lg: "auto" }}
            />
          }
        />
        <LinkCard
          backgroundImage={gptAvatar}
          title={"Open Liberty"}
          description={
            "Open Liberty is an open source implementation of Eclipse MicroProfile and Jakarta EE from IBM. It is the foundation of the WebSphere Liberty app server."
          }
        />
      </Grid>
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "2fr 1fr" }}
        templateRows={{ sm: "1fr auto", md: "1fr", lg: "1fr" }}
        gap="24px"
      >
        <LargeListCard
          title={"Recent Commits"}
          captions={["Commit Hash", "Date", "Commit Message"]}
          data={recentCommits}
        />
        <SmallListCard title={"Top Contributers"} data={topCommiters} />
      </Grid>
    </Flex>
  );
};

export default Dashboard;

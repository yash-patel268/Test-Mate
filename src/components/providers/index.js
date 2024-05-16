import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const Button = {
  baseStyle: {
    cursor: "pointer",
  },
};

const theme = extendTheme({
  config,
  components: {
    Button,
  },
});

const Providers = ({ children, ...props }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default Providers;

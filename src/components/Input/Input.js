import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input as DefaultInput,
  InputProps as DefaultInputProps,
  InputGroup,
  InputRightElement,
  InputLeftElement,
} from "@chakra-ui/react";
import { forwardRef, ReactNode } from "react";

const Input = forwardRef(
  (
    {
      errorMessage,
      label,
      helperText,
      inputLeftAddon,
      inputRightAddon,
      required,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <FormControl isInvalid={Boolean(errorMessage)} isRequired={required}>
        <FormLabel>{label}</FormLabel>
        <InputGroup alignItems="center">
          {!!inputLeftAddon && (
            <InputLeftElement>{inputLeftAddon}</InputLeftElement>
          )}
          <DefaultInput
            value={value}
            onChange={(e) => onChange(e.target.value)}
            {...props}
            ref={ref}
          />
          {!!inputRightAddon && (
            <InputRightElement>{inputRightAddon}</InputRightElement>
          )}
        </InputGroup>
        {!errorMessage ? (
          <FormHelperText>{helperText}</FormHelperText>
        ) : (
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
        )}
      </FormControl>
    );
  }
);

Input.displayName = "Input";

export default Input;

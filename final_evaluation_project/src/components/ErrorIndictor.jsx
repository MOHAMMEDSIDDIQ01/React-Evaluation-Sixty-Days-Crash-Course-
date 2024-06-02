import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export default function ErrorIndictor() {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>SomeThing went wrong</AlertTitle>
      <AlertDescription>Please try again after some time</AlertDescription>
    </Alert>
  );
}

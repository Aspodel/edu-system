import * as React from "react";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ILoginModel } from "interfaces";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  const { login, userInfor } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginModel>();

  const onSubmit = async (data: ILoginModel) => {
    try {
      await login(data);
      navigate((location.state as any)?.from || "/");
    } catch (err: any) {
      console.log(err);
    }
  };

  if (userInfor) return <Navigate to="/" />;

  return (
    <Center height="100%">
      <Container maxW="350px">
        <Heading size="2xl" mb="8">
          Sign in
        </Heading>

        <Box maxW="md" mx="auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing="4">
              <FormControl isInvalid={errors.username ? true : undefined}>
                <Input
                  id="email"
                  placeholder="username"
                  {...register("username", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password ? true : undefined}>
                <Input
                  id="password"
                  placeholder="password"
                  type="password"
                  {...register("password", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Button width="100%" isLoading={isSubmitting} type="submit">
                Sign in
              </Button>
            </VStack>
          </form>
        </Box>
      </Container>
    </Center>
  );
}

export default LoginPage;

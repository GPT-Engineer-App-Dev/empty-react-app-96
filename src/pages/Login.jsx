import { Container, Box, Heading } from "@chakra-ui/react";
import { SupabaseAuthUI } from "../integrations/supabase/auth.jsx";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box width="100%" maxW="md" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <Heading as="h1" size="xl" mb={6} textAlign="center">Login</Heading>
        <SupabaseAuthUI />
      </Box>
    </Container>
  );
};

export default Login;
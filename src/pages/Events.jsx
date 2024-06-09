import { Container, VStack, Heading, Text, Box, Spinner } from "@chakra-ui/react";
import { useEvents } from "../integrations/supabase/index.js";

const Events = () => {
  const { data: events, error, isLoading } = useEvents();

  if (isLoading) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Text fontSize="xl" color="red.500">Failed to load events: {error.message}</Text>
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl">Events</Heading>
        {events.length === 0 ? (
          <Text fontSize="xl">No events available.</Text>
        ) : (
          events.map(event => (
            <Box key={event.id} p={5} shadow="md" borderWidth="1px" borderRadius="md" width="100%">
              <Heading fontSize="xl">{event.name}</Heading>
              <Text mt={4}>{new Date(event.date).toLocaleDateString()}</Text>
              <Text mt={4}>{event.venue_id}</Text>
              <Text mt={4}>{event.is_starred ? "Starred" : "Not Starred"}</Text>
              <Text mt={4}>{event.private ? "Private" : "Public"}</Text>
              <Text mt={4}>{event.cancelled ? "Cancelled" : "Active"}</Text>
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Events;
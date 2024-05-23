import { useState } from "react";
import { Container, VStack, Heading, Text, Button, Input, Textarea, Box, IconButton } from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);

  const handleAddPost = () => {
    if (title && content) {
      const newPost = { id: Date.now(), title, content };
      setPosts([...posts, newPost]);
      setTitle("");
      setContent("");
    }
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleEditPost = (id) => {
    const postToEdit = posts.find((post) => post.id === id);
    setTitle(postToEdit.title);
    setContent(postToEdit.content);
    setIsEditing(true);
    setCurrentPostId(id);
  };

  const handleUpdatePost = () => {
    setPosts(posts.map((post) => (post.id === currentPostId ? { ...post, title, content } : post)));
    setTitle("");
    setContent("");
    setIsEditing(false);
    setCurrentPostId(null);
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">
          My Personal Blog
        </Heading>
        <Box width="100%">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} mb={2} />
          <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} mb={2} />
          {isEditing ? (
            <Button colorScheme="teal" onClick={handleUpdatePost}>
              Update Post
            </Button>
          ) : (
            <Button colorScheme="teal" onClick={handleAddPost}>
              Add Post
            </Button>
          )}
        </Box>
        <VStack spacing={4} width="100%">
          {posts.map((post) => (
            <Box key={post.id} p={4} borderWidth="1px" borderRadius="md" width="100%">
              <Heading as="h3" size="md">
                {post.title}
              </Heading>
              <Text mt={2}>{post.content}</Text>
              <Box mt={4} display="flex" justifyContent="space-between">
                <IconButton aria-label="Edit" icon={<FaEdit />} onClick={() => handleEditPost(post.id)} />
                <IconButton aria-label="Delete" icon={<FaTrash />} onClick={() => handleDeletePost(post.id)} />
              </Box>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;

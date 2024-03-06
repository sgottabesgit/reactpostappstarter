import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Text, Button } from "@mantine/core";

function PostDetailsPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [id]);

  return (
    <Container>
      {post ? (
        <>
          <div>
            <Text>Author: {post.userId}</Text>
            <Text>Title: {post.title}</Text>
            <Text>Category: {post.category}</Text>
            <Text>Content: {post.content}</Text>
          </div>
          <div>
            <img src={post.image} alt="Post" style={{ width: "100%" }} />
          </div>
          <Button>
            <Link to="/posts">Back to Posts</Link>
          </Button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

export const postDetailsLoader = async ({ params }) => {
  return null;
};

export default PostDetailsPage;

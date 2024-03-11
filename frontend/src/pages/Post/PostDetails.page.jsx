// frontend/src/pages/Post/PostDetails.page.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Text, Button } from "@mantine/core";
import useBoundStore from "../../store/Store";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function PostDetailsPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { user } = useBoundStore();

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

  const handleEditClick = () => {
    navigate(`/posts/${id}/edit`);
  };

  const renderPostDetails = () => {
    return (
      <div>
        <h2>{post.title}</h2>
        <p><strong>Author:</strong> {post.authorEmail}</p>
        <p><strong>Category:</strong> {post.category}</p>
        <p><strong>Content:</strong> {post.content}</p>
        <p><strong>Image:</strong></p>
        <div>
          <img src={post.image} alt="Post" style={{ width: "100%" }} />
        </div>
      </div>
    );
  };

  return (
    <Container>
      {user && post?.userId === user.id ? (
        <Button onClick={handleEditClick}>Edit</Button>
      ) : null}
      {post ? (
        renderPostDetails()
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const id = params.id;
  const response = await axios.get(`http://localhost:8085/api/posts/${id}`);
  return response.data;
};

export default PostDetailsPage;

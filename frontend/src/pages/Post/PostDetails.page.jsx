import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Text, Button } from "@mantine/core";
import useBoundStore from "../../store/Store"; // Adjust the path accordingly
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";


function PostDetailsPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const history = useNavigate();
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
    history.push(`/posts/${id}/edit`);
  };

  const renderPostDetails = () => {
    return (
      <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        {/* Add more details as needed */}
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

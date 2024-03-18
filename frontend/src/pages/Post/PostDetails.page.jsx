// PostDetailsPage.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Text, Button } from "@mantine/core";
import useBoundStore from "../../store/Store";
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './PostDetails.css'; // Import the CSS file

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
    if (!post) {
      return <p>Loading...</p>;
    }

    // Check if 'author' property is present in the 'post' object
    const author = post.author ? post.author : 'Unknown Author';

    return (
      <div className="PostDetailsContainer">
        {/* Left Section */}
        <div className="LeftSection">
          <h2>{post.title}</h2>
          <p><strong>Author:</strong> {author}</p> {/* Use 'author' instead of 'truncatedAuthor' */}
          <p><strong>Category:</strong> {post.category}</p>
          <p><strong>Content:</strong> {post.content}</p>
          {user && post?.userId === user.id ? (
            <Button onClick={handleEditClick}>Edit</Button>
          ) : null}
        </div>

        {/* Right Section */}
        <div className="RightSection">
          <p><strong>Image:</strong></p>
          <img src={post.image} alt="Post" style={{ width: "100%" }} />
        </div>
      </div>
    );
  };


  return (
    <Container>
      {/* Back Button */}
      <Button style={{ marginBottom: '10px' }}>
        <Link to="/posts">Back to Posts</Link>
      </Button>

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

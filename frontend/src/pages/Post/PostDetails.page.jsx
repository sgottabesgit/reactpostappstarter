import { Link } from 'react-router-dom';
import { Button, Container } from '@mantine/core';
import './PostDetails.css'; // Import your CSS file

function PostDetailsPage() {
  return (
    <>
      <Container className="post-details-container">
        <div className="post-details-left">
          <p>Author: John123</p>
          <p>Title: Beautiful Sunset</p>
          <p>Category: Nature</p>
          <p>Content: Lorem ipsum dolor sit amet...</p>
        </div>
        <div className="post-details-right">
          <img
            src="https://example.com/path/to/image.jpg"
            alt="Post Image"
            className="post-image"
          />
        </div>
        <Button>
          <Link to="/posts">Back to Posts</Link>
        </Button>
      </Container>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  // do something with this
  return null;
};

export default PostDetailsPage;

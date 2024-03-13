import { useEffect, useState } from "react";
import { Container, Loader } from "@mantine/core";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid } from "@mantine/core";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

const DOMAIN = "http://localhost:8085"; // Define DOMAIN here

export const PostPage = () => {
  const [loading, setLoading] = useState(true); // Define loading state variable

  const posts = useLoaderData();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/posts`);
        console.log("I ran!");
        return res.data;
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container>
      {loading ? (
        <div className="spinner-container">
          <Loader color="blue" /> {/* Render Loader component */}
        </div>
      ) : (
        <SimpleGrid cols={3}>
          {posts?.map((post) => (
            <ArticleCardImage key={post.title} {...post} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export const postsLoader = async () => {
  const res = await axios.get(`${DOMAIN}/api/posts`);
  console.log("I ran!");
  return res.data;
};

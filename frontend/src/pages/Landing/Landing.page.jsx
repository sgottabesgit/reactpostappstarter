import { useEffect, useState } from "react";
import { Container } from "@mantine/core";
import { SimpleGrid } from "@mantine/core";

import { Carousel } from "@mantine/carousel";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import axios from "axios";
import '@mantine/carousel/styles.css';

const Landing = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8085/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container>
      <Carousel withIndicators height={200}>
        {posts.map((post) => (
          <Carousel.Slide key={post.id}>
            <SimpleGrid cols={3}>
              {posts?.map((post) => (
                <ArticleCardImage key={post.title} {...post} />
              ))}
            </SimpleGrid>
          </Carousel.Slide>
        ))}
      </Carousel>
      <h1>Welcome to our photo-sharing app! Share your beautiful moments with the world.</h1>
    </Container>
  );
};

export default Landing;

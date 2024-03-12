import { Container } from "@mantine/core";
import { Carousel } from '@mantine/carousel';
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import '@mantine/carousel/styles.css';

const articles = [
  { id: 1, title: 'Prosthetic arm', category: 'Technology', image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=2432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 2, title: 'DNA', category: 'Science', image: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 3, title: 'Banff', category: 'Nature', image: 'https://images.unsplash.com/photo-1709568039915-14baf8fbba66?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const Landing = () => {
  return (
    <Container>
      <Carousel withIndicators height={200}>
        {articles.map((article) => (
          <Carousel.Slide key={article.id}>
            <ArticleCardImage
              title={article.title}
              category={article.category}
              image={article.image}
              id={article.id}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
      <h1>Welcome to our photo-sharing app! Share your beautiful moments with the world.</h1>
    </Container>
  );
};

export default Landing;

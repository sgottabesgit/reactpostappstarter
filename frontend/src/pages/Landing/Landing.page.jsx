import { Container } from "@mantine/core";
import { Carousel } from '@mantine/carousel';
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import '@mantine/carousel/styles.css';

const articles = [
  { id: 1, title: 'Article 1', category: 'Technology', image: 'image-url-1.jpg' },
  { id: 2, title: 'Article 2', category: 'Science', image: 'image-url-2.jpg' },
  { id: 3, title: 'Article 3', category: 'Travel', image: 'image-url-3.jpg' },
  // Add more articles as needed
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

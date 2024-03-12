import { Container } from "@mantine/core";
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';



const Landing = () => {
  return (
    <Container>
      <Carousel withIndicators height={200}>
        <Carousel.Slide>1</Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
        {/* ...other slides */}
      </Carousel>
      <h1>Welcome to our photo-sharing app! Share your beautiful moments with the world.</h1>
      {/* Add images or any other visual elements */}
      <img src="your-image-url.jpg" alt="App Showcase" />
    </Container>
  );
};

export default Landing;

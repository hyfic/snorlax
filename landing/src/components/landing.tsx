import React from 'react';
import Screen from '../assets/app.png';
import { Center, Container, Heading, Tag } from '@chakra-ui/react';

export const Landing: React.FC = () => {
  return (
    <div className='mb-10 mt-5'>
      <Center mt={10} flexDirection='column'>
        <Tag
          className='bg-app-dark3 text-app-text rounded-full py-3 px-5'
          mb={2}
        >
          Snorlax v1.0.0-beta
        </Tag>
        <Heading size='4xl'>
          Build Your Own <span className='text-app-accent'>File server</span>
        </Heading>
      </Center>
      <Center mt={10}>
        <Container maxW='container.lg' centerContent>
          <img src={Screen} alt='' />
        </Container>
      </Center>
    </div>
  );
};

import React from 'react';
import { Container } from '@chakra-ui/react';
import { Header } from './components/header';
import { Landing } from './components/landing';
import { About } from './components/about';
import { Download } from './components/download';

export const App: React.FC = () => {
  return (
    <Container maxW='container.xl'>
      <Header />
      <Landing />
      <Download />
      <About />
    </Container>
  );
};

export default App;

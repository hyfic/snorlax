import { ReactComponent } from '@/types/react.type';
import { Flex } from '@chakra-ui/react';
import { Navbar } from './navbar';

export const AppLayout: ReactComponent = ({ children }) => {
  return (
    <Flex>
      <Flex direction='column' className='p-3 w-72 h-screen bg-app-dark1'>
        <Navbar />
      </Flex>
      <div className='w-full h-screen overflow-y-scroll px-5 py-3'>
        {children}
      </div>
    </Flex>
  );
};

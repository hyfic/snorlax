import React from 'react';
import { Button, Tooltip } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

export const IssueSettings: React.FC = () => {
  return (
    <div>
      <div>
        <h1 className='text-2xl font-semibold'>Issue</h1>
        <p className='text-app-text opacity-50 mt-1'>
          Report bugs & suggest features.
        </p>
      </div>
      <div className='mt-5'>
        <a href='https://github.com/hyfic/snorlax/issues' target='_blank'>
          <Tooltip
            label='Open new issue on github'
            className='bg-app-dark3 text-app-text border border-app-dark4'
            placement='bottom-start'
          >
            <Button className='text-app-text bg-app-accent transition-all duration-200 hover:bg-app-accent/80'>
              <FaGithub className='mr-2' /> Open new issue
            </Button>
          </Tooltip>
        </a>
      </div>
    </div>
  );
};

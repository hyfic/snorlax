import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Flex, IconButton, Tooltip } from '@chakra-ui/react';
import { TbLayoutGrid } from 'react-icons/tb';
import { RiListCheck2 } from 'react-icons/ri';

export const Header: React.FC = () => {
  return (
    <Flex alignItems='center' justifyContent='space-between'>
      <Flex alignItems='center'>
        <IconButton
          aria-label='back'
          className='hover:bg-app-dark4 text-app-text'
          variant='ghost'
          icon={<MdKeyboardArrowLeft className='text-3xl text-app-text2' />}
        />
        <IconButton
          aria-label='forward '
          className='hover:bg-app-dark4 text-app-text'
          variant='ghost'
          icon={<MdKeyboardArrowRight className='text-3xl text-app-text2' />}
        />
      </Flex>
      <Flex alignItems='center'>
        <Tooltip
          label='Display files in list'
          className='bg-app-dark3 border border-app-dark4 text-app-text'
        >
          <IconButton
            aria-label='list view'
            className='hover:bg-app-dark4 text-app-text mr-1'
            variant='ghost'
            icon={<RiListCheck2 className='text-xl text-app-text2' />}
          />
        </Tooltip>
        <Tooltip
          label='Display files in grid'
          className='bg-app-dark3 border border-app-dark4 text-app-text'
        >
          <IconButton
            aria-label='grid view'
            className='bg-app-dark4 text-app-text'
            icon={<TbLayoutGrid className='text-xl text-app-text' />}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

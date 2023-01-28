import React from 'react';
import HyficLogo from '@/assets/hyfic.svg';
import { useFileListStore } from '@/store/filelist.store';
import { AiFillHeart } from 'react-icons/ai';
import { FaGithub } from 'react-icons/fa';
import { SiBuymeacoffee } from 'react-icons/si';
import {
  Button,
  Flex,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  useTab,
} from '@chakra-ui/react';

export const SettingsPage: React.FC = () => {
  const { view, setView } = useFileListStore();
  const SettingTab: any = React.forwardRef<any>((props, ref) => {
    const tabProps = useTab({ ...props, ref });
    const isSelected = !!tabProps['aria-selected'];

    return (
      <Tab
        className={`font-medium rounded-lg border-2 py-2 mr-2 hover:bg-app-dark4 hover:border-app-dark4 ${
          isSelected
            ? 'bg-app-dark3 border-app-dark4'
            : 'bg-app-dark2 border-app-dark2 '
        }`}
        {...tabProps}
      >
        {tabProps.children}
      </Tab>
    );
  });

  return (
    <div>
      <div>
        <h1 className='text-2xl font-semibold'>Settings</h1>
        <p className='text-app-text opacity-50 mt-1'>
          Configure application options.
        </p>
      </div>
      <Tabs mt={5} variant='unstyled'>
        <TabList>
          <SettingTab>File list</SettingTab>
          <SettingTab>Submit an issue</SettingTab>
          <SettingTab>Contribute</SettingTab>
        </TabList>
        <TabPanels>
          <TabPanel p={0} py={5}>
            <Select
              w='fit-content'
              variant='filled'
              className='bg-app-dark3 font-medium'
              value={view}
              onChange={(e) => setView(e.target.value)}
            >
              <option value='grid'>Grid view</option>
              <option value='list'>List view</option>
            </Select>
          </TabPanel>
          <TabPanel p={0} py={5}>
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
          </TabPanel>
          <TabPanel p={0} py={5}>
            <a href='https://github.com/hyfic/snorlax' target='_blank'>
              <Tooltip
                label='Contribute on github'
                className='bg-app-dark3 text-app-text border border-app-dark4'
              >
                <Button className='text-app-text bg-app-accent transition-all duration-200 hover:bg-app-accent/80'>
                  <FaGithub className='mr-2' /> Contribute
                </Button>
              </Tooltip>
            </a>
            <a href='https://buymeacoffee.com/fadhilsaheer' target='_blank'>
              <Tooltip
                label='Support us on buymeacoffee.com'
                className='bg-app-dark3 text-app-text border border-app-dark4'
              >
                <Button
                  ml={2}
                  className='bg-app-dark3 transition-all duration-200 hover:bg-app-dark4'
                >
                  <SiBuymeacoffee className='mr-2' /> Sponsor
                </Button>
              </Tooltip>
            </a>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Flex mt={5} alignItems='center' justifyContent='space-between'>
        <p className='flex items-center text-app-text2 font-medium'>
          Developed with <AiFillHeart className='text-rose-500 text-xl mx-1' />{' '}
          <a
            href='https://fadhilsaheer.tech'
            target='_blank'
            className='underline underline-offset-4 transition-all duration-200 hover:text-app-text'
          >
            Fadhil
          </a>
        </p>
        <a
          href='https://hyfic.github.io'
          target='_blank'
          className='opacity-70 transition-all duration-200 hover:opacity-100'
        >
          <img src={HyficLogo} alt='' className='ml-1 w-14' />
        </a>
      </Flex>
    </div>
  );
};

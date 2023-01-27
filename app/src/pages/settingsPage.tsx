import React, { useState } from 'react';
import { ServerSettings } from '@/components/settings/serverSettings';
import { SettingItem } from '@/components/settings/settingItem';
import { FiServer } from 'react-icons/fi';
import { TbFiles } from 'react-icons/tb';
import { AiOutlineBug, AiOutlineInfoCircle } from 'react-icons/ai';
import { FileSettings } from '@/components/settings/fileSettings';
import { IssueSettings } from '@/components/settings/issueSettings';
import { About } from '@/components/settings/about';

export enum SettingsOption {
  Server,
  Files,
  Issues,
  About,
}

export const SettingsPage: React.FC = () => {
  const [currentSetting, setCurrentSetting] = useState(SettingsOption.Server);

  return (
    <div className='flex h-screen'>
      <div className='w-60 h-screen border border-l-0 border-t-0 border-b-0 border-app-dark3 p-2'>
        <SettingItem
          setting={SettingsOption.Server}
          currentSetting={currentSetting}
          setCurrentSetting={setCurrentSetting}
        >
          <div className='w-5 mr-2'>
            <FiServer className='text-app-text' />
          </div>
          Server
        </SettingItem>
        <SettingItem
          setting={SettingsOption.Files}
          currentSetting={currentSetting}
          setCurrentSetting={setCurrentSetting}
        >
          <div className='w-5 mr-2'>
            <TbFiles className='text-xl text-app-text' />
          </div>
          Files
        </SettingItem>
        <SettingItem
          setting={SettingsOption.Issues}
          currentSetting={currentSetting}
          setCurrentSetting={setCurrentSetting}
        >
          <div className='w-5 mr-2'>
            <AiOutlineBug className='text-lg text-app-text' />
          </div>
          Issues
        </SettingItem>
        <SettingItem
          setting={SettingsOption.About}
          currentSetting={currentSetting}
          setCurrentSetting={setCurrentSetting}
        >
          <div className='w-5 mr-2'>
            <AiOutlineInfoCircle className='text-lg text-app-text' />
          </div>
          About
        </SettingItem>
      </div>
      <div className='h-screen w-full overflow-y-scroll py-3 pl-5'>
        {currentSetting == SettingsOption.Server && <ServerSettings />}
        {currentSetting == SettingsOption.Files && <FileSettings />}
        {currentSetting == SettingsOption.Issues && <IssueSettings />}
        {currentSetting == SettingsOption.About && <About />}
      </div>
    </div>
  );
};

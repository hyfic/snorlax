import { SettingsOption } from '@/pages/settingsPage';
import { ReactComponent, SetState } from '@/types/react.type';
import { Flex } from '@chakra-ui/react';

interface Props {
  setting: SettingsOption;
  currentSetting: SettingsOption;
  setCurrentSetting: SetState<SettingsOption>;
  className?: string;
}

export const SettingItem: ReactComponent<Props> = ({
  children,
  setting,
  currentSetting,
  setCurrentSetting,
  className,
}) => {
  return (
    <Flex
      py={2}
      px={4}
      mt={1}
      alignItems='center'
      className={`cursor-pointer rounded-md border-2 text-app-text font-medium ${
        currentSetting === setting
          ? 'bg-app-dark3 border-app-dark4'
          : 'opacity-80 transition-all border-app-dark2 duration-100 hover:opacity-100 hover:bg-app-dark3/60'
      } ${className}`}
      onClick={() => setCurrentSetting(setting)}
    >
      {children}
    </Flex>
  );
};

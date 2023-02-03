import SnorlaxLogo from '@/assets/logo.svg';
import { useServerStore } from '@/store/server.store';
import { ReactComponent } from '@/types/react.type';
import { Button } from '@chakra-ui/react';
import { ServerForm } from './serverOptions/serverFormWrapper';

export const ServerCheckerWrapper: ReactComponent = ({ children }) => {
  const { selectedServer } = useServerStore();

  if (selectedServer) {
    return <>{children}</>;
  } else {
    return (
      <div className='w-full h-[90vh] flex flex-col justify-center items-center'>
        <img src={SnorlaxLogo} alt='' className='w-24' />
        <h2 className='text-xl font-medium text-app-text'>
          No server connected!
        </h2>
        <div className='mt-2 w-full px-60 flex justify-center'>
          <p className='text-app-text opacity-60 text-center'>
            You can't use this application unless you connect to a snorlax
            server.
          </p>
        </div>
        <ServerForm>
          <Button
            mt={5}
            className='text-app-text bg-app-accent transition-all duration-200 hover:bg-app-accent/80'
          >
            Add server
          </Button>
        </ServerForm>
      </div>
    );
  }
};

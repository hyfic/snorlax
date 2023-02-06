import React, { useEffect, useState } from 'react';
import { pingServer } from '@/api/ping';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { IoMdRefresh } from 'react-icons/io';

interface Props {
  connection: string | null;
  className?: string;
  refetchBtnToolTip?: string;
  onRefetchBtnClick?: () => void;
}

export const ServerStatus: React.FC<Props> = ({
  connection,
  className,
  refetchBtnToolTip,
  onRefetchBtnClick,
}) => {
  const [isServerOnline, setIsServerOnline] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadServerStatus = () => {
    if (!connection) return;

    setLoading(true);
    pingServer(connection)
      .then(() => setIsServerOnline(true))
      .catch((err) => {
        console.log(err?.message);
        setIsServerOnline(false);
      })
      .finally(() => setLoading(false));
  };

  useEffect(loadServerStatus, [connection]);

  return (
    <div className='flex items-center'>
      <Tooltip
        label={
          loading
            ? 'Loading server status'
            : `Server is ${isServerOnline ? 'online' : 'offline'}`
        }
        className='bg-app-dark3 text-app-text border border-app-dark4'
      >
        <div
          className={`bg-app-dark3 border border-app-dark4 py-2 px-3 rounded-md flex items-center cursor-pointer ${className}`}
        >
          <div
            className={`p-1 border-2 rounded-full mr-1.5 ${
              loading
                ? 'border-app-text2 bg-app-text2'
                : isServerOnline
                ? 'border-teal-300 bg-teal-300'
                : 'border-rose-400 bg-rose-400'
            }`}
          />
          <p className='text-app-text2'>
            {loading ? 'Loading' : isServerOnline ? 'Online' : 'Offline'}
          </p>
        </div>
      </Tooltip>
      {refetchBtnToolTip && onRefetchBtnClick && (
        <Tooltip
          label={refetchBtnToolTip}
          className='bg-app-dark3 text-app-text border border-app-dark4'
        >
          <IconButton
            aria-label='Refetch'
            ml={1}
            icon={<IoMdRefresh className='text-app-text text-xl' />}
            className='bg-app-dark3 border border-app-dark4 hover:opacity-60'
            onClick={() => {
              loadServerStatus();
              onRefetchBtnClick();
            }}
          />
        </Tooltip>
      )}
    </div>
  );
};

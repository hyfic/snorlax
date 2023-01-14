import { createStandaloneToast, UseToastOptions } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

export const showToast = (options: UseToastOptions) => {
  toast({
    ...options,
    position: 'top-right',
    isClosable: true,
    duration: 3000,
  });
};

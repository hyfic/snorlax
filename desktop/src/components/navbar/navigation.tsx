import { ReactComponent } from '@/types/react.type';
import { Link, useLocation } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

interface Props {
  page: string;
  className?: string;
}

export const Navigation: ReactComponent<Props> = ({
  children,
  page,
  className,
}) => {
  const location = useLocation();
  const onPage = location.pathname === page; // check if user is on provided page

  return (
    <Link to={page}>
      <Flex
        py={2}
        px={4}
        mt={1}
        alignItems='center'
        className={`rounded-md border-2 text-app-text font-medium ${
          onPage
            ? 'bg-app-dark3 border-app-dark4'
            : 'opacity-80 transition-all border-app-dark1 duration-100 hover:opacity-100 hover:bg-app-dark2 hover:border-app-dark2'
        } ${className}`}
      >
        {children}
      </Flex>
    </Link>
  );
};

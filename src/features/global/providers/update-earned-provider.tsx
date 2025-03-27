import { ReactNode } from 'react';
import { useUpdateEarnedInterval } from '../hooks/useCallContracts';

interface UpdateEarnedProviderProps {
  children: ReactNode;
}

export const UpdateEarnedProvider = ({
  children,
}: UpdateEarnedProviderProps) => {
  useUpdateEarnedInterval();

  return <>{children}</>;
};

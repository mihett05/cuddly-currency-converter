import React from 'react';
import { useStore } from 'effector-react';
import { Skeleton } from '@mui/material';

import { $converter } from '../store/converter';

interface LoadingProps {
  children: React.ReactNode;
  height: number;
  width?: number;
}

function Loading({ children, height, width }: LoadingProps) {
  const store = useStore($converter);
  const isLoaded = Object.keys(store.currencies).length > 0;

  return isLoaded ? <>{children}</> : <Skeleton height={height} width={width} />;
}

export default Loading;

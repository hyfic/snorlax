import React from 'react';
import { PropsWithChildren } from 'react';

export type ReactComponent<Props = {}> = React.FC<PropsWithChildren<Props>>;

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

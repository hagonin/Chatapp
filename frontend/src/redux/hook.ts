import { useDispatch, useSelector } from 'react-redux'
import { AppDispatchProps, RootStateProps } from './configureStore';
import type { TypedUseSelectorHook } from 'react-redux'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatchProps = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStateProps> = useSelector;
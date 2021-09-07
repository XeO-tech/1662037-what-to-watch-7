import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAppDispatch = () => useDispatch<AppDispatch>();
// middleware may return anything from dispatch, so no way to define return types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


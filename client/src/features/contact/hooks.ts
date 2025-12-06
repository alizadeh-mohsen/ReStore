import type { RootState } from "../../app/store/configureStore";
import { useAppSelector } from "../../app/store/configureStore";

export const selectCounter = (state: RootState) => state.counter;

export const useCounter = () => useAppSelector((state: RootState) => state.counter);

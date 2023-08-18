"use client";
import store from "@/strore";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}
function ReduxProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;

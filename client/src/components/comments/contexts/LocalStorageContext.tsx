import { useLocalStorage } from "@/hooks/useLocalStorage";
import { TUser } from "@/types/user-comments";
import { ReactNode, createContext } from "react";

export interface TLocalStorage {
  currentUser: TUser | undefined;
  setCurrentUser: (newStorage: TUser) => void;
}

export const LocalStorageContext = createContext<TLocalStorage>({
  currentUser: undefined,
  setCurrentUser: () => {},
});

interface LocalStorageProviderProps {
  children: ReactNode;
}

export function LocalStorageProvider({ children }: LocalStorageProviderProps) {
  const { storage: currentUser, setLocalStorage } = useLocalStorage<
    TUser | undefined
  >("user", undefined);

  const setCurrentUser = (user: TUser) => {
    setLocalStorage(user);
  };

  return (
    <LocalStorageContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
}

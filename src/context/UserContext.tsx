import { UserData } from "@/types/userTypes";
import { User } from "@/types/userData";
import { createContext, useState, useContext } from "react";

const UserContext = createContext<UserData | undefined>(undefined);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUser] = useState<User>({ id: 0, name: "", surname: "", email: "", role: "" });

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  const userValue: UserData = {
    user: users,
    updateUser
  };

  return (
    <UserContext.Provider value={userValue}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUserContext must be used within a UserContextProvider");
    }
    return context;
}
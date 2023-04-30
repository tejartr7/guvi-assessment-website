import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";


const localStorageKey = "myAppUser";
export const AuthContext = createContext({ currentUser: null });
const x = {
  username: "",
  email: "email",
  dob: "1901",
  age: '500',
  gender: 'M',
  mobile: '+91-9999999999',
  country:'india',
};
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem(localStorageKey);
    return storedUser ? JSON.parse(storedUser) : null;
  });
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          email: user.email,
          username: user.username,
          dob: user.dob,
          age: user.age,
          gender: user.gender,
          mobile: user.mobile,
          country:user.country,
        };
        x.email = user.email;
        x.username = user.username;
        x.dob = user.dob;
        x.age = user.age;
        x.gender = user.gender;
        x.mobile = user.mobile;
        x.country=user.country;
        setCurrentUser(userData);
        localStorage.setItem(localStorageKey, JSON.stringify(userData));
      } else {
        setCurrentUser(null);
        localStorage.removeItem(localStorageKey);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { x };

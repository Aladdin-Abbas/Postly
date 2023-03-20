import { createContext, useEffect, useState } from "react";
import postApi from "../apis/postApi";

interface IProps {
  children: React.ReactNode;
}

type usersApiResponse = [
  {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      };
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
  }
];

const initialUsersContext = [
  {
    id: 0,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  },
];

export const UserContext = createContext(initialUsersContext);

export default function UserContextProvider({ children }: IProps) {
  const [users, setUsers] = useState(initialUsersContext);
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await postApi.get("/users");
        const json = (await response.data) as usersApiResponse;
        setUsers(json);
      } catch (error) {
        console.log("something went wrong try again later");
        return;
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  return <UserContext.Provider value={users}>{children}</UserContext.Provider>;
}

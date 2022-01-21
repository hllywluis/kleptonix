import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      dname: string;
      hidename: boolean;
      subs: string[];
      email: string;
      password: string;
      name: string;
    };
  }
}

declare module "next-auth" {
  interface User {
    id: number;
    dname: string;
    hidename: boolean;
    subs: string[];
    email: string;
    password: string;
    name: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      dname: string;
      hidename: boolean;
      subs: string[];
      email: string;
      password: string;
      name: string;
    };
  }
}

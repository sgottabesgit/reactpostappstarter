// fakedb.ts

import { Response } from "express";
import jwt from "jsonwebtoken";

export interface IDecodedUser {
  id: number;
}

const users = [
  { id: 1, email: "john123@gmail.com", password: "123" },
  { id: 2, email: "sandra123@gmail.com", password: "123" },
];

export const posts = [
  {
    id: 1,
    title: "Bird",
    category: "nature",
    content:
      "Belted Kingfishers are large-headed birds with a shaggy crest on the back of the head.",
    image:
      "https://cdn.pixabay.com/photo/2017/02/07/16/47/kingfisher-2046453_640.jpg",
    userId: 1,
  },
  {
    id: 2,
    title: "Beautiful BC",
    category: "nature",
    content: "BC is a province full of beauty at every corner.",
    image:
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    userId: 2,
  },
];

export const addPost = (post: any, userId: number) => {
  post.id = posts.length + 1;
  post.userId = userId;

  // Fetch user details based on userId
  const user = findUserById(userId);

  // Set authorEmail in the post
  post.authorEmail = user.email;  // This assumes that user.email is available

  posts.push(post);
};

export const verifyUser = (email: string, password: string) => {
  const user = users.find((user) => user.email === email && user.password === password);
  if (!user) throw new Error("User not found");
  return user;
};

export const findUserById = (id: number) => {
  const user = users.find((user) => user.id === id);
  if (!user) throw new Error("User not found");
  // Truncate the email by removing everything after the @ sign
  const truncatedEmail = user.email.split('@')[0];
  return { ...user, truncatedEmail };
};

export const parseToken = (authHeader: string | undefined, res: Response) => {
  if (!authHeader) {
    res.status(403).send("Header does not exist");
    return null;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(403).send("Token not provided");
    return null;
  }

  try {
    const decodedUser = jwt.verify(token, "secret");
    return { token, userId: (decodedUser as IDecodedUser).id };
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
    return null;
  }
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

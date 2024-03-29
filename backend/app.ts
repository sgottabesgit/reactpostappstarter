import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  posts,
  sleep,
} from "./fakedb";

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

// Middleware for authentication
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const tokenAndUserId = parseToken(authHeader, res);

  if (!tokenAndUserId) {
    return;
  }

  next();
};

// Middleware for payload validation
const validatePayload = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.title || !req.body.category || !req.body.content) {
    return res.status(400).json({ error: "Missing required fields in the payload" });
  }

  next();
};

app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", authenticateToken, (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const tokenAndUserId = parseToken(authHeader, res);

    if (!tokenAndUserId) {
      return;
    }

    const { userId } = tokenAndUserId;
    const user = findUserById(userId);

    res.json({ result: { user, token: tokenAndUserId.token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", async (req, res) => {
  // Sleep delay for 5 seconds (5000 milliseconds)
  await sleep(5000); // Adjust the sleep duration as needed

  // Send the posts data after the sleep delay
  res.json(posts);
});

app.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) {
    res.status(404).json({ error: "Post not found" });
  } else {
    res.json(post);
  }
});

app.post("/api/posts", authenticateToken, validatePayload, (req, res) => {
  const incomingPost = req.body;
  const tokenAndUserId = parseToken(req.headers.authorization, res);

  if (!tokenAndUserId) {
    return;
  }

  const { userId } = tokenAndUserId;
  addPost(incomingPost, userId);
  res.status(200).json({ success: true });
});

app.put("/api/posts/:id", authenticateToken, validatePayload, (req, res) => {
  try {
    const id = req.params.id;
    const tokenAndUserId = parseToken(req.headers.authorization, res);

    if (!tokenAndUserId) {
      return;
    }

    const { userId } = tokenAndUserId;
    const user = findUserById(userId);

    const existingPostIndex = posts.findIndex((post) => post.id === parseInt(id));

    if (existingPostIndex === -1) {
      res.status(404).json({ error: "Post not found" });
    } else {
      const updatedPost = { ...posts[existingPostIndex], ...req.body };
      posts[existingPostIndex] = updatedPost;

      res.json({ success: true, updatedPost });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => console.log("Server is running"));

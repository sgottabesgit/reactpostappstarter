import express from "express";
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

// TODO: Obviously use a more secure signing key than "secret"
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

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", async (req, res) => {
  // Sleep delay goes here
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

app.post("/api/posts", (req, res) => {
  const incomingPost = req.body;

  // Extract user ID from the token
  const authHeader = req.headers.authorization;
  const token = parseToken(authHeader, res);

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const decodedUser = jwt.verify(token, "secret");
    const userId = (decodedUser as IDecodedUser).id;

    // Now you have the user ID, you can use it to add the post
    addPost(incomingPost, userId);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

app.listen(port, () => console.log("Server is running"));

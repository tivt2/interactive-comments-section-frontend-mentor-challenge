import express from "express";
import cors from "cors";
import {
  deleteComment,
  editComment,
  getJSONData,
  insertNewComment,
  scoreComment,
} from "./utils/user-data";

const userPath = "data.json";

const initialData = getJSONData(userPath);
let userData = initialData;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Express on Render");
});

app.get("/comments", (req, res) => {
  console.log("new get request");
  res.json(userData);
});

app.post("/comments", (req, res) => {
  const { content, user, parentIdx, replyingTo } = req.body;
  console.log("new post request");

  userData = insertNewComment(
    { content, user, parentIdx, replyingTo },
    userData,
    10
  );
  console.log("comment inserted");

  res.status(201).json(userData);
});

app.patch("/comments", (req, res) => {
  const { type, parentIdx, content, replyingTo, score } = req.body;
  console.log("new patch request");

  if (type === "DELETE") {
    console.log("data deleted");
    userData = deleteComment(parentIdx, userData);
  } else if (type === "EDIT") {
    console.log("data edited");
    userData = editComment(parentIdx, content, userData, replyingTo);
  } else if (type === "SCORE") {
    console.log("data score edited");
    userData = scoreComment(parentIdx, score, userData);
  }
  res.json(userData);
});

app.post("/reset", (req, res) => {
  console.log("new reset request");
  if (userData != initialData) {
    insertNewComment(
      {
        content: "",
        user: { image: { png: "", webp: "" }, username: "" },
        parentIdx: [],
      },
      userData,
      100,
      true
    );
    userData = initialData;
    console.log("data reseted");
  }
  res.status(200).json(userData);
});

export default app;

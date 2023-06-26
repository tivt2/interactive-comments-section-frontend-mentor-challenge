import fs from "fs";
import { TComment, TJsonData, TNewComment } from "../types/user-comments";

function getJSONData(filePath: string) {
  const data = fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return { error: "Error reading JSON file" };
    }
    try {
      const parsedData = JSON.parse(data);
      console.log("Parsed data successfuly from path:", filePath);
      return parsedData;
    } catch (err) {
      console.error("Error trying to parse data from path:", filePath);
      return { error: "Error trying to parse data" };
    }
  });
  return data;
}

function getJSONData2(filePath: string) {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    console.log("Parsed data successfuly from path:", filePath);
    return JSON.parse(data);
  } catch (err) {
    console.error("Error trying to parse data from path:", filePath);
    return { error: "Error trying to parse data" };
  }
}

function postJSONData<T>(filePath: string, newData: T) {
  try {
    const newDataStringfied = JSON.stringify(newData);
    fs.writeFileSync(filePath, newDataStringfied, "utf-8");
    console.log("Successfuly writen data to path:", filePath);
  } catch (err) {
    console.error("Error writing to file path:", filePath);
  }
}

const insertNewComment = ((): ((
  newComent: TNewComment,
  jsonData: TJsonData,
  maxInsert?: number,
  reset?: boolean
) => TJsonData) => {
  let id = 4;

  return (
    { content, user, parentIdx, replyingTo },
    jsonData,
    maxInsert = 100,
    reset = false
  ) => {
    if (reset) {
      id = 4;
      return jsonData;
    }
    if (id > maxInsert) {
      return jsonData;
    }
    id++;
    const newComment: TComment = {
      content: content,
      createdAt: "1 minute ago",
      id: id,
      replies: [],
      score: 0,
      user: user,
    };

    if (replyingTo) {
      newComment.replyingTo = replyingTo;
    }

    let newJsonData: TJsonData = JSON.parse(JSON.stringify(jsonData));
    if (!parentIdx) {
      newJsonData.comments.push(newComment);
      // remove comment to write to json file
      // postJSONData("db/data.json", newJsonData);
      return newJsonData;
    }

    function foo(idxList: number[], comments: TComment[]) {
      if (idxList.length === 0) {
        comments.push(newComment);
      } else {
        if (!comments[idxList[0]].replies) {
          comments[idxList[0]].replies = [];
        }
        foo([...idxList.slice(1)], comments[idxList[0]].replies);
      }
    }
    foo(parentIdx, newJsonData.comments);

    // remove comment to write to json file
    // postJSONData("db/data.json", newJsonData);
    return newJsonData;
  };
})();

const deleteComment = (parentIdx: number[], jsonData: TJsonData): TJsonData => {
  let newJsonData = JSON.parse(JSON.stringify(jsonData));

  function foo(idxList: number[], comments: TComment[]) {
    if (idxList.length === 1) {
      comments.splice(idxList[0], idxList[0] + 1);
    } else {
      foo([...idxList.slice(1)], comments[idxList[0]].replies);
    }
  }
  foo(parentIdx, newJsonData.comments);

  return newJsonData;
};

const editComment = (
  parentIdx: number[],
  content: string,
  jsonData: TJsonData,
  replyingTo?: string
): TJsonData => {
  let newJsonData = JSON.parse(JSON.stringify(jsonData));

  function foo(idxList: number[], comments: TComment[]) {
    if (idxList.length === 1) {
      comments[idxList[0]].content = content;
      if (replyingTo) {
        comments[idxList[0]].replyingTo = replyingTo;
      } else {
        delete comments[idxList[0]].replyingTo;
      }
    } else {
      foo([...idxList.slice(1)], comments[idxList[0]].replies);
    }
  }
  foo(parentIdx, newJsonData.comments);

  return newJsonData;
};

const scoreComment = (
  parentIdx: number[],
  score: number,
  jsonData: TJsonData
): TJsonData => {
  let newJsonData = JSON.parse(JSON.stringify(jsonData));

  function foo(idxList: number[], comments: TComment[]) {
    if (idxList.length === 1) {
      comments[idxList[0]].score = score;
    } else {
      foo([...idxList.slice(1)], comments[idxList[0]].replies);
    }
  }
  foo(parentIdx, newJsonData.comments);

  return newJsonData;
};

export {
  getJSONData,
  getJSONData2,
  postJSONData,
  insertNewComment,
  deleteComment,
  editComment,
  scoreComment,
};

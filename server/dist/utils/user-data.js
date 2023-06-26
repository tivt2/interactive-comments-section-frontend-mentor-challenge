"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreComment = exports.editComment = exports.deleteComment = exports.insertNewComment = exports.postJSONData = exports.getJSONData = void 0;
const fs_1 = __importDefault(require("fs"));
function getJSONData(filePath) {
    try {
        const data = fs_1.default.readFileSync(filePath, "utf-8");
        console.log("Parsed data successfuly from path:", filePath);
        return JSON.parse(data);
    }
    catch (err) {
        console.error("Error trying to parse data from path:", filePath);
        return null;
    }
}
exports.getJSONData = getJSONData;
function postJSONData(filePath, newData) {
    try {
        const newDataStringfied = JSON.stringify(newData);
        fs_1.default.writeFileSync(filePath, newDataStringfied, "utf-8");
        console.log("Successfuly writen data to path:", filePath);
    }
    catch (err) {
        console.error("Error writing to file path:", filePath);
    }
}
exports.postJSONData = postJSONData;
const insertNewComment = (() => {
    let id = 4;
    return ({ content, user, parentIdx, replyingTo }, jsonData, maxInsert = 100, reset = false) => {
        if (reset) {
            id = 4;
            return jsonData;
        }
        if (id > maxInsert) {
            return jsonData;
        }
        id++;
        const newComment = {
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
        let newJsonData = structuredClone(jsonData);
        if (!parentIdx) {
            newJsonData.comments.push(newComment);
            // remove comment to write to json file
            // postJSONData("db/data.json", newJsonData);
            return newJsonData;
        }
        function foo(idxList, comments) {
            if (idxList.length === 0) {
                comments.push(newComment);
            }
            else {
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
exports.insertNewComment = insertNewComment;
const deleteComment = (parentIdx, jsonData) => {
    let newJsonData = structuredClone(jsonData);
    function foo(idxList, comments) {
        if (idxList.length === 1) {
            comments.splice(idxList[0], idxList[0] + 1);
        }
        else {
            foo([...idxList.slice(1)], comments[idxList[0]].replies);
        }
    }
    foo(parentIdx, newJsonData.comments);
    return newJsonData;
};
exports.deleteComment = deleteComment;
const editComment = (parentIdx, content, jsonData, replyingTo) => {
    let newJsonData = structuredClone(jsonData);
    function foo(idxList, comments) {
        if (idxList.length === 1) {
            comments[idxList[0]].content = content;
            if (replyingTo) {
                comments[idxList[0]].replyingTo = replyingTo;
            }
            else {
                delete comments[idxList[0]].replyingTo;
            }
        }
        else {
            foo([...idxList.slice(1)], comments[idxList[0]].replies);
        }
    }
    foo(parentIdx, newJsonData.comments);
    return newJsonData;
};
exports.editComment = editComment;
const scoreComment = (parentIdx, score, jsonData) => {
    let newJsonData = structuredClone(jsonData);
    function foo(idxList, comments) {
        if (idxList.length === 1) {
            comments[idxList[0]].score = score;
        }
        else {
            foo([...idxList.slice(1)], comments[idxList[0]].replies);
        }
    }
    foo(parentIdx, newJsonData.comments);
    return newJsonData;
};
exports.scoreComment = scoreComment;

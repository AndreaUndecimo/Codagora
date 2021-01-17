import axios from "axios";
const apiUrl = "http://localhost:3500";

// topics api
export async function postTopic({ title, content, tags }) {
  const token = localStorage.getItem("token");
  return axios.post(
    `${apiUrl}/forum/post_topic`,
    { title, content, tags },
    {
      headers: { Authorization: token },
    }
  );
}

export async function getAllTopics() {
  return axios.get(`${apiUrl}/forum/allTopics`);
}

export async function getUserPosts() {
  const token = localStorage.getItem("token");
  return axios.get(`${apiUrl}/forum/user_topics`, {
    headers: { Authorization: token },
  });
}

export async function deleteTopic(_id) {
  const token = localStorage.getItem("token");
  const config = {
    data: { _id },
    headers: { Authorization: token },
  };
  return axios.delete(`${apiUrl}/forum/delete`, config);
}

export async function getSingleTopic(id) {
  const token = localStorage.getItem("token");
  return axios.get(`${apiUrl}/forum/topic_comments/${id}`, {
    headers: { Authorization: token },
  });
}

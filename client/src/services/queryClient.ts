import { QueryClient } from "react-query";
import axios from "axios";

const baseURL = "https://comments-frontend-mentor-api.onrender.com";

export const api = axios.create({
  baseURL,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: api,
    },
  },
});

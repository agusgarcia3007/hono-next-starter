import { http } from "@/lib/http";

export class PostsService {
  public static async getPosts({ page = 1, limit = 10 } = {}) {
    const { data } = await http.get("/posts", {
      params: { page, limit },
    });
    return data;
  }

  public static async createPost(data: { title: string; content: string }) {
    const response = await http.post("/posts", data);
    return response.data;
  }
}

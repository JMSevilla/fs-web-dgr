import { Connect } from "./http-common";
import { PostsDataUpdate } from "../types";
export class Http {
    public fetchSomethingFromDB() {
        return new Connect().init().get('/posts')
    }
    public updatePostsChangeStatus(props: PostsDataUpdate) {
        return new Connect().init().put(`/posts/${props.id}`, props)
    }
}

/**
 * props : {
 * 
 * "id": 1,
      "title": "react typescript course",
      "author": "jm",
      "firstname": "ederson",
      "middlename": "de leon",
      "lastname": "marcial",
      "status": 0
 * }
 */
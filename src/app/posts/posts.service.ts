import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private route: Router) {}
// FETCH POSTS
  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        'http://localhost:3000/api/posts'
      )
      .pipe(map((postData) =>{
        return postData.posts.map((post) => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });

      }))
      .subscribe((formattedPosts) => {
        this.posts = formattedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  //DEFINE OBSERVABLE
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  //ADD POST METHOD
  addPost(title: string, content: string) {
    const post: Post = {
      id: null,
      title: title,
      content: content,
    };
    this.http
      .post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.route.navigate(["/"])
      });
  }

  //DELETE POST

  deletePost(postId: string){
    this.http.delete(`http://localhost:3000/api/posts/${postId}`)
    .subscribe(()=>{
      const updatedPosts = this.posts.filter( post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  //EDIT POST METHOD
  getPost(id: string){
    return this.http.get<{_id:string,title:string,content:string}>(`http://localhost:3000/api/posts/${id}`);
  }

  //UPDATED POST METHOD
  updatePost(id:string, title: string, content: string){
    const post: Post = {
      id: id,
      title: title,
      content: content,
    };
    this.http.put(`http://localhost:3000/api/posts/${id}`,post)
    .subscribe(response => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.route.navigate(["/"])
    });

  }
}

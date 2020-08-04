import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  @Output() postCreated = new EventEmitter<Post>();
  enteredContent: string = "";
  enteredTitle: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onAddPost(form: NgForm){
    if (form.invalid) {
      return;
    }
    const post: Post = {
      title: form.value.title,
      content: form.value.content
    }
    this.postCreated.emit(post);
  }

}

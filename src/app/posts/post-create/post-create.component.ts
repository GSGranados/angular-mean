import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  userContent: string = "No Content ";

  constructor() { }

  ngOnInit(): void {
  }

  onAddPost(){
    alert('Post added to the Application!');
    this.userContent = "The user has POST"
  }

}

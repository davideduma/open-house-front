import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CommentPeople } from 'src/app/core/models/CommentPeople';
import { GenericResponse } from 'src/app/core/models/GenericResponse';
import { HomeContentPost } from 'src/app/core/models/HomeContentPost';
import { LikesByPost } from 'src/app/core/models/LikeByPost';
import { HomeContentService } from 'src/app/core/services/home-content.service';

@Component({
  selector: 'app-home-publications',
  templateUrl: './home-publications.component.html',
  styleUrls: ['./home-publications.component.scss']
})
export class HomePublicationsComponent implements OnInit{
  
  public posts: HomeContentPost[] = [];

  @Input()
  public user: string = "";

  public newComment: { [key: string]: string } = {};
  
  constructor(private homeContentService: HomeContentService,
    private datePipe: DatePipe){
  }

  ngOnInit(): void {
    //set user with local storage
    //this.user = localStorage.getItem('userName') || "";
    
    this.loadPosts();
  }
 
  loadPosts() {
    this.homeContentService.getPosts(this.user).subscribe((response: HomeContentPost[]) => {
      console.log("response posts", response);
      
      this.posts = response;

      console.log("posts", this.posts)
    },
    (error) => {
      console.error('Error', error);
    }
    );
  }

  doLike(id: string, index: number){

    this.homeContentService.doLike(id).subscribe({
      next: (response: LikesByPost) => {
        console.log("response doLike", response);
        this.posts[index].likes = response.likes;
      },
      error: (error) => {
        console.error('Error', error);
      }
    });

  }

  addComment(id: String, index: number){

    //print all arguments the function receives
    console.log("id", id);
    console.log("newComment", this.newComment);
    console.log("index", index);
    console.log("user publications", this.user);

    if(this.newComment[index] != "" && this.newComment[index] != undefined){
      let singleComment: CommentPeople = {
        name: this.user,
        comment: this.newComment[index],
        imgUserComment: localStorage.getItem('userImg') || "",
        timeComment: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss') || "" 
      }
      
      this.homeContentService.addComment(id, singleComment).subscribe({
        next: (response: GenericResponse) => {
          console.log("response", response);
  
          if(response.resultState){
            this.posts[index].commentPeople.push(singleComment);

            //clean input
            this.newComment[index] = "";
          }
        },
        error: (error: any) => {
          console.error('Error', error);
        }
      });
    }

  }

}

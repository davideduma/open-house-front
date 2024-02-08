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
  public newCommentChanged: { [key: string]: string } = {};
  
  constructor(private homeContentService: HomeContentService,
              private datePipe: DatePipe)
  {

  }

  ngOnInit(): void {
    this.loadPosts();
  }
 
  /**
   * Funcion para cargar las publicaciones del usuario logeado
   */
  loadPosts() {
    this.homeContentService.getPosts(this.user).subscribe((response: HomeContentPost[]) => {
      this.posts = response;
    },
    (error) => {
      console.error('Error', error);
    }
    );
  }

  /**
   * Funcion para dar me gusta a una publicacion determinada
   * @param id Representa el ID de la publicacion
   * @param index Representa la posicion de la publicacion de las de mas publicaciones
   */
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

  /**
   * Funcion para adicionar un comentario en una publicidad determinada.
   * @param id Representa el ID de la publicacion
   * @param index Representa la posicion de la publicacion de las de mas publicaciones
   */
  addComment(id: String, index: number){

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

            // Limpia entrada
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

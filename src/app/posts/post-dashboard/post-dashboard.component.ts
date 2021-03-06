import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { PostService } from '../post.service';
import { Observable } from "rxjs";
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {

  title: string
  image: string
  content: string
  content2: string
  content3: string

  buttonText: string = 'Create Post'

  uploadPercent: Observable<number>
  downloadURL: Observable<string>
  constructor(private auth: AuthService, private postService: PostService, private storage: AngularFireStorage, private router: Router) { }

  ngOnInit() {
  }

  createPost() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content: this.content,
      content2: this.content2,
      content3: this.content3,
      image: this.image || null,
      published: new Date(),
      title: this.title
    };
    this.postService.create(data)
    this.title = ''
    this.content = ''
    this.buttonText = 'Saving'
    setTimeout(() => { this.buttonText = 'Create Post' }, 800)
    this.router.navigate(['/blog'])
  }

  uploadImage(event) {
    const file = event.target.files[0]
    const filePath = `posts/${file.name}`
    if (file.type.split('/')[0] !== 'image') {
      return alert('only image files accepted')
    } else {
      const fileRef = this.storage.ref(filePath) // Add this line to get the path as a ref
      const task = this.storage.upload(filePath, file);
      // observe percentage changes
      this.uploadPercent = task.percentageChanges();
      // get notified when the download URL is available
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => this.image = url);
        })
      ).subscribe();

    }
  }

}

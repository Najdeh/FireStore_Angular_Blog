import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { PostService } from '../post.service';
import { Observable } from "rxjs";
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {

  title: string
  image: string
  content: string

  buttonText: string = 'Create Post'

  uploadPercent: Observable<number>
  downloadURL: Observable<string>
  constructor(private auth: AuthService, private postService: PostService, private storage: AngularFireStorage) { }

  ngOnInit() {
  }

  createPost() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content: this.content,
      image: this.image || null,
      published: new Date(),
      title: this.title
    };
    this.postService.create(data)
    this.title = ''
    this.content = ''
    this.buttonText = 'Saving'
    setTimeout(() => { this.buttonText = 'Create Post' }, 800)

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
      this.downloadURL = fileRef.getDownloadURL() // And this one to actually grab the URL from the Ref
      fileRef.getDownloadURL().subscribe(ref => {
        console.log('REF', ref)
        console.log(this.downloadURL);
        this.downloadURL = ref
      })
      // this.uploadPercent = task.percentageChanges()
      // console.log('image Uploaded');
       this.downloadURL.subscribe(url => (this.image = url))
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  form!: FormGroup;
  posts: any[]=[]
  closeResult =''; 
  searchText = ''
  public searchFilter: any = '';
  page: any = 1;
  

  constructor(private apiService: ApiService, private modalService: NgbModal, private fb: FormBuilder, ) {  }
    
  ngOnInit(): void {
  this.getAll()

    this.form = this.fb.group({
      id: ["", [Validators.required,  Validators.minLength(5)]
      ],
      title: ["", [Validators.required, ]
    ],
      body: ["", [Validators.required, ]
    ],
    });
  }

  get f() { return this.form.controls }

  getAll(){
    this.apiService.get().subscribe((Posts:any)=>{
      this.posts = Posts 
    
    })
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  

  submit(){
    this.apiService.create(this.form.value).subscribe(res => {
         console.log(res);
         this.posts.unshift(this.form.value)
         this.form.reset()
        
    })
  }

  deletePost(id:number){
    this.apiService.delete(id).subscribe(res => {
         this.posts = this.posts.filter((post:any) => post.id !== id);
    })
  }


  search(){
    if(this.searchText == ''){
      this.ngOnInit()
    }else{
      this.posts = this.posts.filter(res => {
        return res.title.toLowerCase().match(this.searchText.toLowerCase())
      })
    }
  }





}

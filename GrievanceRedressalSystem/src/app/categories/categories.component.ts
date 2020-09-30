import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  category : Category[];
  postCategory = {categoryname:'',head:''};
  categoryname:'';
  head:'';
  getCategoriesError : string;
  errInAddingCategories : string;
  errInDeletingCategories : string;

  constructor(private clientService : ClientService) {
        }

  ngOnInit(): void {
    this.clientService.getCategories().subscribe((res)=> {
      this.category = res;
      console.log(this.category);
    },
    errmess => {this.getCategoriesError = 'Login as Admin to view this page';console.log(this.getCategoriesError)})

  }

  addCategory(){
    console.log(this.postCategory);
    if(this.postCategory.categoryname && this.postCategory.head){
    this.clientService.addCategories(this.postCategory)
    .subscribe((res)=>{
      if(res.success){
        this.postCategory.categoryname = '';
        this.postCategory.head = '';
        this.errInAddingCategories='';
      }
    },err => { this.errInAddingCategories = 'Unable to add Category, Please try again';})
  }
  else{
    this.errInAddingCategories = 'Unable to add Category, Please try again';
  }
  }

  deleteCategory(id : string){
    alert("Confirm deleting category. This action cannot be undone");
    console.log(id);
    this.clientService.deleteCategory(id).subscribe((res)=>{console.log(res)},
    error => {
    console.log("error occcured");
    })
  }

}

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

  constructor(private clientService : ClientService) {
      this.clientService.getCategories().subscribe((res)=> {
        this.category = res;
        console.log(this.category);
      })
  }

  ngOnInit(): void {
  }

  addCategory(){
    console.log(this.postCategory);
    this.clientService.addCategories(this.postCategory)
    .subscribe((res)=>console.log(res));
  }

}

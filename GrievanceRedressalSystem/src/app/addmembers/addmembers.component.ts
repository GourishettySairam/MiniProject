import { Component, OnInit } from '@angular/core';
import { Member } from '../shared/member';

@Component({
  selector: 'app-addmembers',
  templateUrl: './addmembers.component.html',
  styleUrls: ['./addmembers.component.css']
})
export class AddmembersComponent implements OnInit {

  constructor() { }

  member = { name:'', email:'', department:'' };

  ngOnInit(): void {
  }

  addMember(){
    
  }

}

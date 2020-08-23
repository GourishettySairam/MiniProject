import { Component, OnInit } from '@angular/core';
import { Member } from '../shared/member';
import { ClientService } from '../services/client.service';
@Component({
  selector: 'app-addmembers',
  templateUrl: './addmembers.component.html',
  styleUrls: ['./addmembers.component.css']
})
export class AddmembersComponent implements OnInit {

  constructor(private clientService : ClientService) { }

  isMemberAdded :boolean = false;

  member = { name:'', email:'', department:'' };

  ngOnInit(): void {
  }

  addMember(){
    this.clientService.addmember(this.member)
    .subscribe((res) => {
      if(res.success){
        console.log("member added ");
        this.isMemberAdded = true;
        this.member.name = '';
        this.member.email='';
        this.member.department='';
      }
      else{
        console.log("unable to add member ");
      }
    },
    error => {
    console.log("error occcured");
    })
  }

  addAnotherMember(){
    this.isMemberAdded = !this.isMemberAdded;
  }

}

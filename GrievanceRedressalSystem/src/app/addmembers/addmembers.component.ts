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
  showMembers : boolean = false;
  members : Member[];

  member = { name:'', email:'', department:'' };

  ngOnInit(): void {
    this.clientService.getMembers()
    .subscribe(members => {this.members = members;console.log(this.members)},
    errmess => {console.log(errmess)});
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

  deleteMember(id : string){
    alert("Confirm deleting user. This action cannot be undone");
    console.log(id);
    this.clientService.deleteMember(id).subscribe((res)=>{console.log(res)
    },
    error => {
    console.log("error occcured");
    })
  }

  showMembersOnClick(){
    console.log("hello inside");
    this.showMembers = !this.showMembers;
  }

}

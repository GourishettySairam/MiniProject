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
    errmess => {this.getMembersError = 'Login as Admin to view this page'});
  }

  getMembersError : string;
  errInAddingMembers : string;
  errInDeletingMembers : string;

  addMember(){
    if(this.member.name && this.member.email && this.member.department){
    this.clientService.addmember(this.member)
    .subscribe((res) => {
        console.log("member added ");
        this.isMemberAdded = true;
        this.member.name = '';
        this.member.email='';
        this.member.department='';
        this.errInAddingMembers = ''
      },
      error => { this.errInAddingMembers = 'Unable to add Member, Please try again';
    })
  }
  else{
    this.errInAddingMembers = 'Unable to add Member, Please try again';
  }
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
    this.errInDeletingMembers = 'Member cannot be deleted. Please try again'
    })
    if(this.errInDeletingMembers){
      alert(this.errInDeletingMembers);
    }
  }

  showMembersOnClick(){
    console.log("hello inside");
    this.showMembers = !this.showMembers;
  }

}

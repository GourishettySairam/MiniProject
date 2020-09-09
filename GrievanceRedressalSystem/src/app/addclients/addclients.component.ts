import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-addclients',
  templateUrl: './addclients.component.html',
  styleUrls: ['./addclients.component.css']
})
export class AddclientsComponent implements OnInit {

  isClientAdded :boolean = false;
  showUsers : boolean = false;

  constructor(private clientService : ClientService) { }

  Users : User[];
  user = { firstname:'', lastname:'', username:'', password:''};

  ngOnInit(): void {
    this.clientService.getUsers()
    .subscribe(users => {this.Users = users;console.log(this.Users)},
    errmess => {console.log(errmess)});
  }

  addClient(){
    console.log(this.user);
    this.clientService.addClient(this.user)
    .subscribe((res) => {
      console.log("client added successfully");
      this.isClientAdded = true;
      this.user.firstname = '',
      this.user.lastname = '',
      this.user.username = '',
      this.user.password = ''
    })
  }

  addAnotherClient(){
    this.isClientAdded = !this.isClientAdded;
  }

  deleteUser(username : any){
    alert("delete this username. This action cannot be undone");
    console.log("user deleted");
  }

  showUsersOnClick(){
    this.showUsers = !this.showUsers;
  }

}

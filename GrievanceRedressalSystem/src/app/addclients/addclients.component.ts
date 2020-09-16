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
  user = { firstname:'', email:'', username:'', password:''};

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
      this.user.email = '',
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
    console.log(username);

    this.clientService.getUserEmail(username).subscribe((res) => {
      if(res){
        console.log(res);
        this.clientService.deleteUser(res[0]._id).subscribe((resin)=>{
          console.log(resin);
        })
      }
    })
  }

  showUsersOnClick(){
    this.showUsers = !this.showUsers;
  }

}

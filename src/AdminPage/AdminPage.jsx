import React from 'react';

import { userService } from '@/_services';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null,
        };
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
    }

    updateRole(userData){
        console.log(userData,"shjdhhsdhsjdhj", userData.email)
        fetch("http://localhost:8080/user", {
            
            method: "POST",
            body: JSON.stringify({
                "userId":userData.userId,
                "firstName": userData.firstName,
                "lastName": userData.lastName,
                "role": "admin",
                "email": userData.email,
                "password": userData.password
              
            }),
            headers: { 'Content-Type': 'application/json' },
          }).then(
            user=>{
                alert("Role has been Updated to Admin")
                window.location.reload()
            },
            error => {
                console.log(error)
            }
        );
    }

    deleteUser(userData){
        console.log(userData,"shjdhhsdhsjdhj", userData.email);
        fetch(`http://localhost:8080/user/${userData.userId}`, {
            
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
          }).then(
            user=>{
                alert("User has been Deleted")
                window.location.reload()
            },
            error => {
                console.log(error)
            }
        );
    }

    render() {
        const { users } = this.state;
        const contents = <React.Fragment>{users && 
            users.map(item => {
            // change the title and location key based on your API
            return <tr >
            <td scope="row">{item.firstName} {item.lastName}</td> 
            <td scope="row">{item.role}</td>
            {(() => {
              if (item.role != 'admin'){
                  return (
                    <React.Fragment>      
            <td> <button className="btn btn-primary btn-sm" onClick={() => this.updateRole(item)}> Promote </button></td>
            
            </React.Fragment>
            )
            }
        
             return <td></td>;
            })()}
            <td> <button className="btn btn-danger btn-sm" onClick={() => this.deleteUser(item)}>Delete User </button></td>
          </tr>
       })
    }</React.Fragment>
        return (
            <div><h3>User Details Table</h3>
             <table class="table table-striped table-hover table-secondary  table-bordered" style={{'text-align': 'center'}}>
              <tr className='bg-dark text-white'>
                <th scope="col" >User Name</th>
                <th >Role</th> 
                <th >Promote to Admin</th> 
                <th >Delete User</th> 
              </tr>
                {contents}
            </table>
            </div>
        );
    }
}

export { AdminPage };
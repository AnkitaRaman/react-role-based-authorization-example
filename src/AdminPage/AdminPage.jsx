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
        
        fetch("http://34.145.73.148/user", {
            
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
                
            }
        );
    }

    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
        }

    deleteUser(userData){
        
        fetch(`http://34.145.73.148/user/${userData.userId}`, {
            
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
          }).then(
            user=>{
                alert("User has been Deleted")
                window.location.reload()
            },
            error => {
                
            }
        );
    }

    render() {
        const { users } = this.state;
        const contents = <React.Fragment>{users && 
            users.map(item => {
            // change the title and location key based on your API
            return <tr >
            <td scope="row">{this.Capitalize(item.firstName)} {this.Capitalize(item.lastName)}</td> 
            <td scope="row">{this.Capitalize(item.role)}</td>
             <td> <button className="btn btn-primary btn-sm" disabled={item.role=="admin"} onClick={() => this.updateRole(item)}> Promote </button></td>
            
            <td> <button className="btn btn-danger btn-sm" onClick={() => this.deleteUser(item)}>Delete User </button></td>
          </tr>
       })
    }</React.Fragment>
        return (
            <div><h3>User Details Table</h3>
             <table className="table table-striped table-hover table-secondary  table-bordered" style={{'text-align': 'center'}}>
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
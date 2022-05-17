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

    render() {
        const { users } = this.state;
        const contents = <div>{users && 
            users.map(item => {
            // change the title and location key based on your API
            return <tr>
            <td>{item.firstName}</td> 
            <td>{item.role}</td>
            {(() => {
              if (item.role != 'admin'){
                  return (
            <div> <button className="btn btn-primary btn-sm" onClick={() => this.updateRole(item)}>Update Role </button></div>
            )
        }
        
        return null;
      })()}
          </tr>
       })
    };</div>
        return (
            <div className="container">
      <div className="row">
         <div className="col-md-6 col-md-offset-5">
             <h1 className="title">All Events</h1>
             <table>
              <tr>
                <th>Event title</th>
                <th>Event location</th> 
              </tr>
                {contents}
            </table>
         </div>
      </div>
    </div>
        );
    }
}

export { AdminPage };
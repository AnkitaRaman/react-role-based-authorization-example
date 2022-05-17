import React from 'react';

import { userService, authenticationService } from '@/_services';

class CoursesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null,
            coursesFromApi:null,
            coursesFromApiLive:null,
            getCName:null,
            name: '',
            email:'',
            cIds:''
        };
    
    this.handleChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.approveInputChange.bind(this);
    this.approveRequest = this.approveRequest.bind(this);
    }

 

    componentDidMount() {
        const { currentUser } = this.state;
        
        userService.getById(currentUser.userId).then(userFromApi => this.setState({ userFromApi }));
        userService.getAllCourses().then((coursesFromApi) => {
          var coursesFromApiLive = coursesFromApi.filter(function (el)
          {
            return el.status=="live"
          }
          );
        this.setState({ coursesFromApi,coursesFromApiLive } );
        
        
        console.log(coursesFromApi,"akjksjakjs",(coursesFromApiLive))
        });
        // userService.getCourrseById(1).then(getCName => this.setState({ getCName }));
        console.log(currentUser,"getCName")
        var roleUser=currentUser.role;
    }


    handleSubmit(event) {
      const { currentUser } = this.state;
        console.log('A form was submitted: ',currentUser);
        fetch("http://localhost:8080/courses", {
            
            method: "POST",
            body: JSON.stringify({
                courses: this.state.name,
              status: (currentUser.role=="admin"?"Live":"Pending"),
              
            }),
            headers: { 'Content-Type': 'application/json' },
          }).then(
            data=>{
              console.log("erroe");
              window.location.reload();
            },
            
            error => {
                console.log(error)
            }
        );
        alert("course Submitted");
        
        event.preventDefault();
      }
      handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
          [name]: value
        });
      }

      approveRequest(event) {
          console.log("in approval",event.target.cIds.value)
          console.log('A form was submitted: ' + this.state.name + ' // ' + this.state.email);
          userService.getCourrseById(event.target.cIds.value).then((getCName) => {console.log("Belsari");this.setState({ getCName }); console.log("getCName",getCName);
          console.log(getCName.courses,"XXXXXXXXXXX",getCName);
        fetch("http://localhost:8080/courses/updatestatus", {
            
            method: "PUT",
            body: JSON.stringify({
                cId:getCName.cId ,
                courses: getCName.courses,
                status: "live"
              
            }),
            headers: { 'Content-Type': 'application/json' },
          }).then(
            update=>{
              alert("course has been approved")
              window.location.reload(); 
            },
            error => {
                console.log(error)
            }
        );
        });

         
        
        event.preventDefault();
      }

      approveInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log("tarva",target.value)
        this.setState({
          [name]: value
        });
      }
    render() {
        const { currentUser, userFromApi, coursesFromApi, coursesFromApiLive } = this.state;
        let roleBasedStatus;
        if (currentUser.role == 'user'){
          
            roleBasedStatus= <div className="form-group">
          <label for="emailImput">Status</label>
          <input name="email" type="text" value={this.state.email} disabled onChange={this.handleChange} className="form-control" id="emailImput" placeholder="Pending" />
        </div>
      }else{
            roleBasedStatus=<div className="form-group">
          <label for="emailImput">Status</label>
          <input name="email" type="text" value={this.state.email} disabled onChange={this.handleChange} className="form-control" id="emailImput" placeholder="Live" />
        </div>
         }
        console.log("coursesFromApiLive",coursesFromApiLive)
        return (
            <div>
                <h3>Hi <strong>{currentUser.firstName}</strong></h3>
                <p>Your role is: <strong>{currentUser.role}</strong>.</p>
                <p>This page can be accessed by all authenticated users.</p>
                <div>
                    
                    <ul>CourseId===Course============ Status</ul>
                    {coursesFromApi &&
                        <ul>
                           
                        {coursesFromApi.map(coursesFromApi =>
                            <li >{coursesFromApi.cId}==={coursesFromApi.courses}============ {coursesFromApi.status}</li>
                        )}
                        
                        </ul>
                    }
                </div>
      
<div>
<form onSubmit={this.handleSubmit} >
{(() => {
             // if (currentUser.role == 'user'){
                  return (
                      
                 <div>
                   <h4>Request New Course</h4>
          <div className="form-group">
            <label for="nameImput">Course</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" id="nameImput" placeholder="Course" />
          </div>
         {roleBasedStatus}
          <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
          )
      //  }
        
      //  return null;
      })()}
        </form>

        <form onSubmit={this.approveRequest} >
{(() => {
              if (currentUser.role == 'admin'){
                  return (
                      
                 <div>
          {/* <div className="form-group">
            <label for="nameImput">Course</label>
            <input type="number" name="cIds" value={this.state.cIds} onChange={this.handleUpdate} className="form-control" id="nameImput" />
          </div>
          <input type="submit" value="Submit" className="btn btn-primary" />
          </div> */}

<div className="form-group">
            <label for="nameImput">Course</label>
            <input type="text" name="cIds" value={this.state.cIds} onChange={this.handleUpdate} className="form-control" id="nameImput" />
          </div>
          <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
          )
        }
        
        return null;
      })()}
        </form>
        </div>
            </div>

        );
    }
}

export { CoursesPage };
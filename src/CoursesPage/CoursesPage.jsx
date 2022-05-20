import React from 'react';

import { userService, authenticationService } from '@/_services';
import '../style.css';
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
        
        
        
        });
        // userService.getCourrseById(1).then(getCName => this.setState({ getCName }));
        
        var roleUser=currentUser.role;
    }

    deleteUser(courseData){
      
      fetch(`http://34.145.73.148/courses/${courseData.cId}`, {
          
          method: "DELETE",
          headers: { 'Content-Type': 'application/json' },
        }).then(
          user=>{
              alert("Course is being Deleted")
              window.location.reload()
          },
          error => {
              
          }
      );
  }

    handleSubmit(event) {
      const { currentUser } = this.state;
        
        fetch("http://34.145.73.148/courses", {
            
            method: "POST",
            body: JSON.stringify({
                courses: this.state.name,
              status: (currentUser.role=="admin"?"live":"Pending"),
              
            }),
            headers: { 'Content-Type': 'application/json' },
          }).then(
            data=>{
              
              window.location.reload();
            },
            
            error => {
                
            }
        );
        alert("Course Submitted");
        
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
          
          
          userService.getCourrseById(event.target.cIds.value).then((getCName) => {
          
        fetch("http://34.145.73.148/courses/updatestatus", {
            
            method: "PUT",
            body: JSON.stringify({
                cId:getCName.cId ,
                courses: getCName.courses,
                status: "live"
              
            }),
            headers: { 'Content-Type': 'application/json' },
          }).then(
            update=>{
              alert("Course has been approved")
              window.location.reload(); 
            },
            error => {
              console.log(error)
            }
        );
        });

         
        
        event.preventDefault();
      }

      Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
        }

      approveRequest1(data) {
        
        userService.getCourrseById(data.cId).then((getCName) => {
        
      fetch("http://34.145.73.148/courses/updatestatus", {
          
          method: "PUT",
          body: JSON.stringify({
              cId:getCName.cId ,
              courses: getCName.courses,
              status: "live"
            
          }),
          headers: { 'Content-Type': 'application/json' },
        }).then(
          update=>{
            alert("Course has been approved")
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
        
        this.setState({
          [name]: value
        });
      }
    render() {
        const { currentUser, userFromApi, coursesFromApi, coursesFromApiLive } = this.state;
        let roleBasedStatus;
        const contents = <React.Fragment>{coursesFromApi && 
          coursesFromApi.map(item => {
          // change the title and location key based on your API
          const temp = (item.status=="live") ? "text-success" : "text-secondary";
          const redDot = (item.status=="live") ? "spinner-grow text-danger" : "";
          return <tr >
          <td scope="row">{item.cId}</td> 
          <td scope="row" className="kk">{this.Capitalize(item.courses)}</td>
          <td scope="row" className={temp}> <span className={redDot} style={{width: '1rem', height: '1rem'}} role="status"><span className="sr-only">Loading...</span></span><strong>{this.Capitalize(item.status)}</strong></td>
          
          {(() => {
              
              if (currentUser.role == 'admin'){
                  return (
                    <React.Fragment>      
            
            <td> <button className="btn btn-info btn-sm" disabled={item.status=="live"} onClick={() => this.approveRequest1(item)}>Approve </button></td>
            <td> <button className="btn btn-danger btn-sm" onClick={() => this.deleteUser(item)}>Delete </button></td>
            </React.Fragment>
            )
            }
        
             return;
            })()}
        </tr>
     })
       }</React.Fragment>

        if (currentUser.role == 'user'){
          
            roleBasedStatus= <div className="form-group" hidden>
          <label for="emailImput">Status</label>
          <input name="email" type="text" value={this.state.email} disabled onChange={this.handleChange} className="form-control" id="emailImput" placeholder="Pending" />
        </div>
      }else{
            roleBasedStatus=<div className="form-group" hidden>
          <label for="emailImput">Status</label>
          <input name="email" type="text"  value={this.state.email} disabled onChange={this.handleChange} className="form-control" id="emailImput" placeholder="live" />
        </div>
         }
        
        return (
            <div>
                <h3>Hi <strong>{this.Capitalize(currentUser.firstName)}</strong></h3>
                <p>Your role is: <strong>{this.Capitalize(currentUser.role)}</strong>.</p>
                <p>As per your role you can request, approve or delete the courses.</p>
                <div>
                    <table class="table table-striped table-hover table-secondary  table-bordered"  style={{'text-align': 'center'}}>
                      <tr className='bg-dark text-white'>
                        <th scope="col" >Course ID</th>
                        <th >Course Name</th> 
                        <th >Status</th>
                        
                        {(() => {
              if (currentUser.role == 'admin'){
                  return (
                    <React.Fragment>  
                      <th>Approve Course</th>    
                      <th >Delete Course </th> 
                      
            </React.Fragment>
            )
            }
        
             
            })()}
                      </tr>
                        {contents}
                    </table>
                </div>
      
<div>
<form onSubmit={this.handleSubmit} >
{(() => {
                  return (
                      
                 <div>
                   <h4>Request New Course</h4>
          <div className="form-group">
            <label for="nameImput">Enter new Course name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" id="nameImput" placeholder="Course" />
          </div>
         {roleBasedStatus}
          <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
          )
      })()}
        </form>

        <form onSubmit={this.approveRequest} >
{(() => {
              if (currentUser.role == 'admin'){
                  return (
                      
                 <div>
          
            <h4 style={{padding:"1em 0em 0em 0em"}}>Approve Course by cId</h4>
            <div className="form-group">
            <label for="nameImput">Please provide Course Id  to approve</label>
            <input type="number" name="cIds" value={this.state.cIds} onChange={this.handleUpdate} className="form-control" id="nameImput" placeholder="Course Id"/>
          </div>
          <input type="submit" value="Approve" className="btn btn-primary" />
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
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
        
        
        console.log(coursesFromApi,"akjksjakjs",(coursesFromApiLive))
        });
        // userService.getCourrseById(1).then(getCName => this.setState({ getCName }));
        console.log(currentUser,"getCName")
        var roleUser=currentUser.role;
    }

    deleteUser(courseData){
      console.log(courseData,"Ankita");
      fetch(`http://34.145.73.148/courses/${courseData.cId}`, {
          
          method: "DELETE",
          headers: { 'Content-Type': 'application/json' },
        }).then(
          user=>{
              alert("Course is being Deleted")
              window.location.reload()
          },
          error => {
              console.log(error)
          }
      );
  }

    handleSubmit(event) {
      const { currentUser } = this.state;
        console.log('A form was submitted: ',currentUser);
        fetch("http://34.145.73.148/courses", {
            
            method: "POST",
            body: JSON.stringify({
                courses: this.state.name,
              status: (currentUser.role=="admin"?"live":"Pending"),
              
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

      Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
        }

      approveRequest1(data) {
        console.log("in approval",data);
        userService.getCourrseById(data.cId).then((getCName) => {console.log("Belsari");this.setState({ getCName }); console.log("getCName",getCName);
        console.log(getCName.courses,"XXXXXXXXXXX",getCName);
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
        const contents = <React.Fragment>{coursesFromApi && 
          coursesFromApi.map(item => {
          // change the title and location key based on your API
          const temp = (item.status=="live") ? "text-success" : "text-secondary";
          const redDot = (item.status=="live") ? "spinner-grow text-danger" : "";
          return <tr >
          <td scope="row">{item.cId}</td> 
          <td scope="row" className="kk">{this.Capitalize(item.courses)}</td>
          <td scope="row" className={temp}> <span className={redDot} style={{width: '1rem', height: '1rem'}} role="status"><span class="sr-only">Loading...</span></span><strong>{this.Capitalize(item.status)}</strong></td>
          
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
        console.log("coursesFromApiLive",coursesFromApiLive)
        return (
            <div>
                <h3>Hi <strong>{currentUser.firstName}</strong></h3>
                <p>Your role is: <strong>{currentUser.role}</strong>.</p>
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
             // if (currentUser.role == 'user'){
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
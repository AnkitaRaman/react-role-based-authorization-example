import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { LoginPage } from '@/LoginPage';
import { authenticationService } from '@/_services';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) { 
            this.props.history.push('/');
        }
    }
    navigateTo = () => this.props.history.push('/login')
    render() {
        return (
            <div>
                <h2>Register</h2>
                
                <Formik
                    initialValues={{
                      "firstName": "",
                      "lastName": "",
                      "role": "user",
                      "email": "",
                      "password": ""
                    }}
                    validationSchema={Yup.object().shape({
                      firstName: Yup.string().required('firstName is required'),
                      lastName: Yup.string().required('lastName is required'),
                      role: Yup.string().required('role is required'),
                      email: Yup.string().required('email is required'),
                      password: Yup.string().required('Password is required')
                    })}
                    onSubmit={({firstName,lastName,role,email,password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        try {
                          let res = fetch("http://localhost:8080/user", {
                            
                            method: "POST",
                            body: JSON.stringify({
                              firstName: firstName,
                              lastName: lastName,
                              role:role,
                              email: email,
                              password: password,
                            }),
                            headers: { 'Content-Type': 'application/json' },
                          }).then(
                            user => {
                                const { from } = this.props.location.state || { from: { pathname: "/" } };
                                this.props.history.push(from);
                            },
                            
                            error => {
                                setSubmitting(false);
                                setStatus(error);
                            }
                        );
                        console.log("erroe")
                        } catch (err) {
                          console.log(err);
                        }                        
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label>First Name</label>
                                <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label>Role</label>
                                <Field name="role" type="text" className={'form-control' + (errors.role && touched.role ? ' is-invalid' : '')} />
                                <ErrorMessage name="role" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Username</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>                           
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Register</button> <br/><br/>
                                {isSubmitting &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                                <button type="submit" className="btn btn-primary" onClick={this.navigateTo} >Login</button>
                                
                            
                            </div>
                            {status &&
                                <div className={'alert alert-danger'}>{status}</div>
                            }
                        </Form>
                    )}
                />
            </div>
        )
    }
}

export { RegisterPage }; 












// import { useState } from "react";

// function RegisterPage() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [role, setRole] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

  // let handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let res = await fetch("http://localhost:8080/user", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         firstName: firstName,
  //         lastName: lastName,
  //         role:role,
  //         email: email,
  //         password: password,
  //       }),
  //     });
  //     let resJson = await res.json();
  //     if (res.status === 200) {
  //       setFirstName("");
  //       setLastName("");
  //       setEmail("");
  //       setPassword("");
  //       setMessage("User created successfully");
  //     } else {
  //       setMessage("Some error occured");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

//   return (
//     <div className="App">
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={firstName}
//           placeholder="Name"
//           onChange={(e) => setFirstName(e.target.value)}
//         />
//         <input
//           type="text"
//           value={lastName}
//           placeholder="Name"
//           onChange={(e) => setLastName(e.target.value)}
//         />
//         <input
//           type="text"
//           value={lastName}
//           placeholder="Role"
//           onChange={(e) => setRole(e.target.value)}
//         />
//         <input
//           type="text"
//           value={email}
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="text"
//           value={password}
//           placeholder="Mobile Number"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit">Create</button>

//         <div className="message">{message ? <p>{message}</p> : null}</div>
//       </form>
//     </div>
//   );
// }

// export default RegisterPage;

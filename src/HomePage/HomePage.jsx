import React from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { userService, authenticationService } from '@/_services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        };
    }

    componentDidMount() {
        const { currentUser } = this.state;
        userService.getById(currentUser.userId).then((userFromApi)=>{ this.setState({ userFromApi });
        console.log(userFromApi)
        localStorage.setItem('currentUser', JSON.stringify(userFromApi));});
    }

    navigateTo = () => this.props.history.push('/')

    render() {
        const { currentUser, userFromApi } = this.state;
        return (
            <div>
                <h1> Welcome Home</h1>
                
                
                <div>
                    {userFromApi &&
                         <div>
                         <div>  <h4> Hi {userFromApi.firstName} {userFromApi.lastName}</h4></div>
                         <p>Your role is: <strong>{currentUser.role}</strong>.</p>
                         <p>This page can be accessed by all authenticated users.</p>
                         <p>Please update your password.</p>
                         </div>
                    }
                </div>
                <Formik
                    initialValues={{
                        oldPassword: '',
                        newPassword: ''
                    }}
                    validationSchema={Yup.object().shape({
                        oldPassword: Yup.string().required('Old Password is required'),
                        newPassword: Yup.string().required('newPassword is required')
                    })}
                    onSubmit={
                        
                        ({ oldPassword, newPassword }, { setStatus, setSubmitting }) => {
                            setStatus();
                            console.log(oldPassword,"22",currentUser.password);
                            if(currentUser.password==oldPassword){
                                fetch("http://localhost:8080/user", {
            
                                method: "POST",
                                body: JSON.stringify({
                                    "userId":currentUser.userId,
                                    "firstName": currentUser.firstName,
                                    "lastName": currentUser.lastName,
                                    "role": currentUser.role,
                                    "email": currentUser.email,
                                    "password": newPassword
                                
                                }),
                                headers: { 'Content-Type': 'application/json' },
                            }).then(

                                user => {
                                    alert("password updated")
                                    setSubmitting(false);
                                    console.log("o",user);
                                    // window.location.reload(); 
                                },
                                error => {
                                    console.log(error);
                                    setStatus(error);
                                    setSubmitting(false);
                                }
                                )
                            }else{
                                alert("Old password incorrect reenter")
                                
                            }
                        

                            window.location.reload();
                    console.log("new",newPassword)
                        }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="oldPassword">Username</label>
                                <Field name="oldPassword" type="password" className={'form-control' + (errors.oldPassword && touched.oldPassword ? ' is-invalid' : '')} />
                                <ErrorMessage name="oldPassword" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPassword">newPassword</label>
                                <Field name="newPassword" type="password" className={'form-control' + (errors.newPassword && touched.newPassword ? ' is-invalid' : '')} />
                                <ErrorMessage name="newPassword" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting} onClick={this.navigateTo}>Login</button> <br/> <br/>
                                
                                {isSubmitting &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }                            
                            
                            </div>
                            
                            {status &&
                                <div className={'alert alert-danger'}>{status}</div>
                            }
                        </Form>
                    )}
                />
            </div>
        );
    }
}

export { HomePage };
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
        
        localStorage.setItem('currentUser', JSON.stringify(userFromApi));});
    }

    navigateTo = () => this.props.history.push('/')
    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
        }
    render() {
        const { currentUser, userFromApi } = this.state;
        return (
            <div>
                <h1> Welcome Home</h1>
                
                
                <div>
                    {userFromApi &&
                         <div>
                         <div>  <h4> Hi <span style={{'color':'mediumblue'}}>{this.Capitalize(userFromApi.firstName)} {this.Capitalize(userFromApi.lastName)}</span> </h4></div>
                         <p>Your current role is: <strong>{this.Capitalize(currentUser.role)}</strong>.</p>
                         
                         </div>
                    }
                </div>
                <Formik
                    initialValues={{
                        oldPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    }}
                    validationSchema={Yup.object().shape({
                        oldPassword: Yup.string().required('Old Password is required'),
                        newPassword: Yup.string().required('newPassword is required'),
                        confirmPassword: Yup.string().required('newPassword is required')
                    })}
                    onSubmit={
                        
                        ({ oldPassword, newPassword,confirmPassword }, { setStatus, setSubmitting }) => {
                            setStatus();
                            
                            
                            
                            
                            if(currentUser.password==oldPassword){
                                if(newPassword==confirmPassword){
                                fetch("http://34.145.73.148/user", {
            
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
                                    alert("Your Password has been updated !!")
                                    setSubmitting(false);
                                    
                                     window.location.reload(); 
                                },
                                error => {
                                    
                                    setStatus(error);
                                    setSubmitting(false);
                                }
                                )}else{
                                    setSubmitting(false);
                                    alert("New password and confirm password doesn't match ! Try again !")
                                }
                            }else{
                                alert("Old password incorrect !! Please re-enter the old password")
                                setSubmitting(false);
                            }
                        

                           
                    
                        }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <p>Please update your password in every 60 days.</p>
                            <div>Update your password below :</div><br/>
                            <div className="form-group">
                                <label htmlFor="oldPassword">Old Password</label>
                                <Field name="oldPassword" type="password" className={'form-control' + (errors.oldPassword && touched.oldPassword ? ' is-invalid' : '')} />
                                <ErrorMessage name="oldPassword" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPassword">New Password</label>
                                <Field name="newPassword" type="password" className={'form-control' + (errors.newPassword && touched.newPassword ? ' is-invalid' : '')} />
                                <ErrorMessage name="newPassword" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting} onClick={this.navigateTo}>Update Password</button> <br/> <br/>
                                
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
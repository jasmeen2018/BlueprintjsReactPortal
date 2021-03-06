
import React from 'react';
import NavMenubar from '../../components/Navbar'
import { connect } from 'react-redux'
import {signupAction} from '../../actions/signup'
import {IsValidForm} from '../../components/validation'
import Loader from 'react-loader-advanced';
import { Spinner, FormGroup, Button, Card, Elevation } from '@blueprintjs/core';
import ErrorCallout from '../../components/ErrorCallout';
import { centeredElements, fullHeight } from '../../styles/commonStyles';
import FormCardContainer from '../../components/FormCardContainer';

class Signup extends React.Component{
  constructor(){
    super();
    this.state = {
      signup: {
        username: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      errors:{},
      errorMsg: '',
      serverMsg: '',
      loader: false
    }
  }
  onChange = (key,event) => {
    const { signup } = this.state
    signup[key] = event.target.value
    this.setState({ signup })
  }
  validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };
  onSubmit = (e) => {
    e.preventDefault();
    let {signup} = this.state;
    let fields = ['username', 'email', 'password', 'confirm_password']
     let formValidation = IsValidForm(fields, signup)
     this.setState({ errors: formValidation.errors, errorMsg: '', serverMsg: '' })
     if (formValidation.validate) {
      let emailValidate = this.validateEmail(signup.email)
      let {errors} = this.state;
        if (signup.password != signup.confirm_password) {
          errors['confirm_password'] = "password doesn't match";
          this.setState({ errors })
        }
        else if(!emailValidate){
          errors['email'] = "Please enter valid email";
          this.setState({ errors })
        }
        else{
           this.setState({ loader: true });
           this.props.dispatch(signupAction(this.state.signup)).then(res=>{
             if (res.status == 200) {
                signup = {username: '', email: '', password: '', confirm_password: ''}
                this.setState({signup, serverMsg: ''});
                this.props.history.push('/')
             }
             else{
              this.setState({serverMsg: res.message})
             }
             this.setState({ loader: false });
           })
           .catch(err => {
            this.setState({ loader: false });
           })
        }
     }

  }
  showError = (key) => {
     let errors = this.state.errors
     if (errors[key] && errors[key].length) {
       return true
     }
     return false
   }
   getError = (key) => {
     let errors = this.state.errors
     if (errors[key] && errors[key].length) {
       return typeof errors[key] === 'object' ? errors[key].join(',') : errors[key]
     }
     return false
   }

  render(){
    return(
      <Loader contentStyle={fullHeight} show={this.state.loader} message={<Spinner intent="success" />}>
        <NavMenubar />
        <div style={{...centeredElements, ...fullHeight}}>
            <FormCardContainer
              title="Signup"
            >
              <form onSubmit={this.onSubmit}>
              <FormGroup
                    helperText={!!this.showError('username')?this.getError('username'):null}
                    intent="danger"
                >
                <input className="pt-input" placeholder="Username" style={{width: "100%", height: '50px'}} type="text" dir="auto" onChange={this.onChange.bind(this,'username')}/>
              </FormGroup>
              <FormGroup
                    helperText={!!this.showError('email')?this.getError('email'):null}
                    intent="danger"
                >
                <input className="pt-input" style={{width: "100%",height: '50px'}} placeholder="Email" type="text" dir="auto" onChange={this.onChange.bind(this,'email')}/>
              </FormGroup>
              <FormGroup
                    helperText={!!this.showError('password')?this.getError('password'):null}
                    intent="danger"
                >
                <input className="pt-input" style={{width: "100%",height: '50px'}} placeholder="Password" type="password" dir="auto" onChange={this.onChange.bind(this,'password')}/>
              </FormGroup>
              <FormGroup
                    helperText={!!this.showError('confirm_password')?this.getError('confirm_password'):null}
                    intent="danger"
                >
                <input className="pt-input" style={{width: "100%",height: '50px'}} placeholder="Confirm Password" type="password" dir="auto" onChange={this.onChange.bind(this,'confirm_password')}/>
              </FormGroup>
                <Button intent="success" large style={{ width: '100%' }} type="submit">Signup</Button>
                <ErrorCallout msg={this.state.serverMsg} />
              </form>
            </FormCardContainer>
        </div>
      </Loader>
    )
  }
}
export default connect(
state => (
  {

  },
  mapDispatch
)
)(Signup)

const mapDispatch = dispatch => {
const allActionProps = Object.assign({}, dispatch)
return allActionProps
}
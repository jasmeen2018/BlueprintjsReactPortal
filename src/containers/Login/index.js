import React from 'react';
import NavMenubar from '../../components/Navbar'
import { connect } from 'react-redux'
import {loginAction} from '../../actions/login'
import {IsValidForm} from '../../components/validation'
import Loader from 'react-loader-advanced';
import { Spinner, FormGroup, Button, Card, Elevation, Callout } from '@blueprintjs/core';
import { fullHeight, centeredElements, margins, text } from '../../styles/commonStyles';
import ErrorCallout from '../../components/ErrorCallout';
import FormCardContainer from '../../components/FormCardContainer';

class Login extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      login: {
        email: '',
        password: ''
      },
      errors:{},
      errorMsg: '',
      loader: false
    }
  }

  onChange = (key,event) => {
    const { login } = this.state
    login[key] = event.target.value
    this.setState({ login })
  }
  onSubmit = (e) => {
      e.preventDefault();
      let fields = ['email', 'password'];
       let formValidation = IsValidForm(fields, this.state.login)
       this.setState({ errors: formValidation.errors, errorMsg: '' })
       if (formValidation.validate) {
        this.setState({ loader: true });
       this.props.dispatch(loginAction(this.state.login)).then(res=>{
         if (!res.token) {
          this.setState({errorMsg: res.message})
         }
         else{
           this.setState({errorMsg: ''})
           this.props.history.push('/dashboard')
         }
         this.setState({ loader: false });
       })
       .catch(err => {
        this.setState({ loader: false });
       })
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
              title="Login"
            >
              <form onSubmit={this.onSubmit}>
                <FormGroup
                      helperText={<ErrorCallout msg={this.getError('email')} />}
                      intent="danger"
                  >
                    <input className="pt-input" style={{width: "100%", height: '50px'}} placeholder="Email" type="text" dir="auto" onChange={this.onChange.bind(this,'email')}/>
                </FormGroup>
                <FormGroup
                      helperText={<ErrorCallout msg={this.getError('password')} />}
                      intent="danger"
                  >
                    <input className="pt-input" style={{width: "100%",height: '50px'}} placeholder="Password" type="password" dir="auto" onChange={this.onChange.bind(this,'password')}/>
                </FormGroup>
                <Button intent="success" large style={{ width: '100%' }} type="submit">Login</Button>
                <ErrorCallout msg={this.state.errorMsg} />
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
)(Login)

const mapDispatch = dispatch => {
const allActionProps = Object.assign({}, dispatch)
return allActionProps
}

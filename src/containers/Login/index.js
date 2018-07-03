import React from 'react';
import Navbar from '../../components/Navbar'
import { connect } from 'react-redux'
import {loginAction} from '../../actions/login'
import {IsValidForm} from '../../components/validation'
import Loader from 'react-loader-advanced';
import { Spinner, FormGroup, Button } from '@blueprintjs/core';

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
      <Loader show={this.state.loader} message={<Spinner intent="success" />}>
        <div>
          <div>
            <Navbar />
          </div>
          <form onSubmit={this.onSubmit}>
            <div style={{width: '500px',margin: '0 auto',marginTop: '220px',border: '1px solid black',padding: '50px',backgroundColor: '#e8e6e6'}}>
                <FormGroup
                    helperText={!!this.showError('email')?this.getError('email'):null}
                    intent="danger"
                >
                  <input className="pt-input" style={{width: "100%", height: '50px'}} placeholder="Email" type="text" dir="auto" onChange={this.onChange.bind(this,'email')}/>
                </FormGroup>
               <FormGroup
                    helperText={!!this.showError('password')?this.getError('password'):null}
                    intent="danger"
                >
                  <input className="pt-input" style={{width: "100%",height: '50px'}} placeholder="Password" type="password" dir="auto" onChange={this.onChange.bind(this,'password')}/>
              </FormGroup>
              <Button large style={{ width: '100%' }} type="submit">Login</Button>
              {this.state.errorMsg != '' && <p className="error-message" style={{textAlign: 'center', marginTop: 20}}>{this.state.errorMsg}</p>}
            </div>
          </form>
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

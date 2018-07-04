
import React from 'react';
import Navbar from '../../components/Navbar'
import { connect } from 'react-redux'
import {editProfile, updateProfile} from '../../actions/editprofile'
import Loader from 'react-loader-advanced';
import {IsValidForm} from '../../components/validation'
import { Spinner, FormGroup, Button } from '@blueprintjs/core';
import FormCardContainer from '../../components/FormCardContainer';
import { centeredElements, fullHeight } from '../../styles/commonStyles';
class EditProfile extends React.Component{
  constructor(){
    super();
    this.state = {
      profile: {
        email: '',
        password: '',
        confirm_password: ''
      },
      errors:{},
      serverMsg: '',
      successMsg: '',
      loader: false

    }
  }
  componentWillMount(){
    let user_id = localStorage.getItem('user_id');
    let {profile} = this.state;
    this.props.dispatch(editProfile(user_id)).then(res=>{
      profile = res.user_data;
      this.setState({profile})
    })
  }
  onChange(key,event){
    const { profile } = this.state
    profile[key] = event.target.value
    this.setState({ profile })
  }
  validateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };
  onSubmit(e){
    e.preventDefault();
    let user_id = localStorage.getItem('user_id');
    let {profile} = this.state;
    let fields = ['email', 'password', 'confirm_password']
     let formValidation = IsValidForm(fields, profile)
     this.setState({ errors: formValidation.errors, serverMsg: '' })
     if (formValidation.validate) {
      let emailValidate = this.validateEmail(profile.email)
      let {errors} = this.state;
      if (profile.password != profile.confirm_password) {
        errors['confirm_password'] = "password doesn't match";
        this.setState({ errors })
      }
      else if(!emailValidate){
        errors['email'] = "password doesn't match";
        this.setState({ errors })
      }
      else{
        profile.id = user_id;
        this.setState({loader: true})
        this.props.dispatch(updateProfile(profile)).then(res=>{
           if (res.status == 200) {
              //profile = {email: '', password: '', confirm_password: ''}
              this.setState({successMsg : res.message, serverMsg: ''})
           }
           else{
              this.setState({serverMsg: res.message})
           }
            this.setState({loader: false})
         })
       }
      }
  }
  showError(key) {
     let errors = this.state.errors
     if (errors[key] && errors[key].length) {
       return true
     }
     return false
   }
   getError(key) {
     let errors = this.state.errors
     if (errors[key] && errors[key].length) {
       return typeof errors[key] === 'object' ? errors[key].join(',') : errors[key]
     }
     return false
   }
  render(){
    let {profile} = this.state;
    return(
      
        <Loader contentStyle={fullHeight} show={this.state.loader} message={<Spinner intent="success" />}>
        <div style={{...centeredElements, ...fullHeight}}>
        <FormCardContainer
          title="Edit profile"
        >
        <form onSubmit={this.onSubmit.bind(this)}>
          <FormGroup
                helperText={!!this.showError('email')?this.getError('email'):null}
                intent="danger"
            >
              <input className="pt-input" style={{width: "100%",height: '50px'}} value={profile && profile.email} placeholder="Email" type="email" dir="auto" onChange={this.onChange.bind(this,'email')}/>
            </FormGroup>
            <FormGroup
                helperText={!!this.showError('password')?this.getError('password'):null}
                intent="danger"
            >
              <input className="pt-input" style={{width: "100%",height: '50px'}} value={profile && profile.password} placeholder="Password" type="password" dir="auto" onChange={this.onChange.bind(this,'password')}/>
            </FormGroup>
            <FormGroup
                helperText={!!this.showError('confirm_password')?this.getError('confirm_password'):null}
                intent="danger"
            >
              <input className="pt-input" style={{width: "100%",height: '50px'}} value={profile && profile.confirm_password} placeholder="Confirm Password" type="password" dir="auto" onChange={this.onChange.bind(this,'confirm_password')}/>
            </FormGroup>
            <Button intent="success" large style={{ width: '100%' }} type="submit">Update</Button>
            {this.state.serverMsg != '' && <p className="error-message" style={{textAlign: 'center', marginTop: 20}}>{this.state.serverMsg}</p>}
            {this.state.successMsg != '' && <p className="success-message" style={{textAlign: 'center', marginTop: 20}}>{this.state.successMsg}</p>}
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
)(EditProfile)

const mapDispatch = dispatch => {
const allActionProps = Object.assign({}, dispatch)
return allActionProps
}

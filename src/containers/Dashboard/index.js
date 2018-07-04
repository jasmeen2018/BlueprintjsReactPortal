import React from 'react'
import { connect } from 'react-redux'
import {editAction} from '../../actions/editprofile'
import { Spinner, FormGroup, Button } from '@blueprintjs/core';
class Dashboard extends React.Component{
  onSubmit = () => {
    localStorage.removeItem('token')
    this.props.history.push('/')
  }
  onEdit = () =>  {
    this.props.history.push('/editprofile')
  }

  openRoadmaps = () => {
    this.props.history.push('/roadmaps');
  }

  render(){
    console.log(this.props,'ppppp')
    return(
      <div style={{textAlign: 'center',marginTop: 20}}>
        <h1 >Welcome to Dashboard</h1>
        <FormGroup>
          <Button large style={{ width: 400 }} type="button" onClick={this.onSubmit}>Logout</Button>
        </FormGroup>
        <FormGroup>
          <Button large style={{ width: 400 }} type="button" onClick={this.openRoadmaps}>Roadmaps</Button>
        </FormGroup>
        <FormGroup>
          <Button large style={{ width: 400 }} type="button" onClick={this.onEdit}>Edit Profile</Button>
        </FormGroup>

    </div>
    )
  }
}
export default connect(
state => (
  {

  },
  mapDispatch
)
)(Dashboard)

const mapDispatch = dispatch => {
const allActionProps = Object.assign({}, dispatch)
return allActionProps
}

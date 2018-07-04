import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavbarGroup, NavbarDivider, NavbarHeading, Button, Alignment } from "@blueprintjs/core";

export default class NavMenubar extends React.Component{

  render(){
    return(
      <Navbar fixedToTop={true}>
          <NavbarGroup>
              <NavbarHeading>Blueprint</NavbarHeading>
              <NavbarDivider />
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
              <Link to="/"><button className="pt-button pt-minimal pt-icon-log-in" >Login</button></Link>
              <Link to="/signup"><button className="pt-button pt-minimal pt-icon-document">Signup</button></Link>
          </NavbarGroup>
      </Navbar>
    )
  }
}
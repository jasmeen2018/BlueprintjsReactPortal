import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { roadMaps } from'../../data';
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";

export default class RoadMaps extends Component {
	state = {
		roadmaps: roadMaps
	}

	handleClick(id){
		console.log(id)
		this.props.history.push(`/roadmap/${id}`)
	}

	render() {
		return(
			<div style={{marginTop: 20, textAlign: 'center'}}>
				<h1 style={{textAlign: 'center', display: 'inline-block'}}>Roadmaps</h1>
				<div className="menuList">
					<Menu>
		                {this.state.roadmaps.map((roadmap, key) => <MenuItem icon="new-text-box" key={key} onClick={this.handleClick.bind(this, roadmap.id)} text={roadmap.title} />)}
		            </Menu>
	            </div>
			</div>
		)
	}
}
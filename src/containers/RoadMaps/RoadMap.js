import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { roadMaps } from'../../data';

export default class RoadMap extends Component {

	render() {
		const { id } = this.props.match.params;
		const roadMap = roadMaps.find((item) => item.id === parseInt(id)) || {};

		return(
			<div style={{marginTop: 20, textAlign: 'center'}}>
				<h1 style={{textAlign: 'center', display: 'inline-block'}}>{roadMap.title}</h1>
				
					<table style={{margin: '0 auto'}} class="pt-html-table pt-html-table-striped">
					  <thead>
					    <tr>
					      <th>Sr.No</th>
					      <th>Category</th>
					    </tr>
					  </thead>
					  <tbody>
					    {roadMap.categories.map((category, key) => <tr key={key}>
					      <td>{key+1}</td>
					      <td>{category.title}</td>
					    </tr>)}
					  </tbody>
					</table>
			</div>
		)
	}
}
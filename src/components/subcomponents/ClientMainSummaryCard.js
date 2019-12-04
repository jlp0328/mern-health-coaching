import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default function ClientMainSummaryCard() {
	return (
		<Card>
			<CardContent>
				<div className='client-landing-summary-card'>
					<div className='client-landing-summary-card--left'>
						<h3>
							Current Weekly Average: <span>145</span>
						</h3>
						<h3>Goals for this week...</h3>
						<ul>
							<li>
								Carbs: <span>145</span>
							</li>
							<li>
								Protein: <span>145</span>
							</li>
							<li>
								Fat: <span>57</span>
							</li>
						</ul>
					</div>
					<div className='client-landing-summary-card--right'>
						<h3>
							Your next weekly checkin is: <span>Monday, December 14</span>
						</h3>
						<h3>
							Your next monthly checkin is: <span>Monday, January 3</span>
						</h3>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

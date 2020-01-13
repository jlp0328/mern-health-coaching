import React from 'react';
import * as moment from 'moment';
import { isUndefined, isNull, isEmpty } from 'lodash';
import { determineCorrespondingCheckin } from '../../Common';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default function ClientMainSummaryCard({ client: { goals, personal } }) {
	let nextCheckIn;
	let nextMonthlyCheckin;
	const weeklyGoals = goals[0];

	//Weekly Checkin Date
	const checkinday = moment().day(personal.checkinday)._d;

	if (!isUndefined(checkinday)) {
		let getDate = determineCorrespondingCheckin(personal, checkinday);
		getDate = moment(getDate).format('dddd, MMMM Do');
		nextCheckIn =
			getDate === moment().format('dddd, MMMM Do')
				? 'Today by 9am EST'
				: getDate;

		//Monthly Checkin Date
		const month = moment().format('M');
		const year = moment().format('YYYY');
		const currentMonth = moment(
			new Date(`${month} / ${personal.monthlycheckin} / ${year}`),
		);

		const upcoming = moment(currentMonth)
			.add(1, 'months')
			.format('dddd, MMMM Do');

		nextMonthlyCheckin =
			moment() > currentMonth
				? upcoming
				: moment(currentMonth).format('dddd, MMMM Do');
	}

	return (
		<Card className='client-main--summary-card' elevation={3}>
			<CardContent>
				<div className='client-landing-summary-card'>
					<p className='client-main--summary-headings'>
						Current Weekly Average: <span>145</span>
					</p>
					<div>
						<p className='client-main--summary-headings'>
							Goals for this week...
						</p>
						<ul>
							<li>
								Carbs:
								{!isUndefined(weeklyGoals) ? (
									<span> {weeklyGoals.carbs}</span>
								) : (
									<span> TBD</span>
								)}
							</li>
							<li>
								Protein:
								{!isUndefined(weeklyGoals) ? (
									<span> {weeklyGoals.protein}</span>
								) : (
									<span> TBD</span>
								)}
							</li>
							<li>
								Fat:
								{!isUndefined(weeklyGoals) ? (
									<span> {weeklyGoals.fat}</span>
								) : (
									<span> TBD</span>
								)}
							</li>
						</ul>
					</div>
					<p className='client-main--summary-headings'>
						Your next weekly checkin is: <span>{nextCheckIn}</span>
					</p>
					<p className='client-main--summary-headings'>
						Your next monthly checkin is: <span>{nextMonthlyCheckin}</span>
					</p>
				</div>
			</CardContent>
		</Card>
	);
}

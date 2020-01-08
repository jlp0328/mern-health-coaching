import axios from 'axios';
import moment from 'moment';
import { isEmpty } from 'lodash';

export const isNumberKey = e => {
  if ((e.which >= 48 && e.which <= 57) || e.which === 8 || e.which === 46) {
    return;
  } else {
    e.preventDefault();
  }
};

export const isAnyKey = e => {
  return;
};

export const isEnterKey = key => {
  return key === 'Enter';
};

//Getting data for forms on client main page
export const fetchData = async (client, date, type, source) => {
  let dateFormatted = moment.utc(date.setHours(0, 0, 0, 0)).format();

  let entryForDate;

  try {
    entryForDate = await axios.get(
      `http://${process.env.REACT_APP_BACKEND_IP}:5000/${type}/${client._id}/${dateFormatted}`,
      { cancelToken: source.token }
    );
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Call was cancelled!');
    } else {
      console.log(error);
    }
  }

  return entryForDate;
};

//Determine the week that weight, macros, or exercise correspond to
export const determineCorrespondingCheckin = (client, date) => {
  if (!isEmpty(client)) {
    const checkinday = moment
      .utc(date.setHours(0, 0, 0, 0))
      .day(client.checkinday)
      .format();

    const selectedDate = moment.utc(date.setHours(0, 0, 0, 0)).format();

    const startOfWeek =
      checkinday === selectedDate || checkinday < selectedDate
        ? moment
            .utc(checkinday)
            .add(1, 'weeks')
            .format()
        : checkinday;

    return startOfWeek;
  }
};

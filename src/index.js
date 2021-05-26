import { ajax } from 'rxjs/ajax';
import { mergeMap, startWith } from 'rxjs/operators';
import { interval } from 'rxjs';

const URL = 'https://polling-backend.herokuapp.com/messages/unread';

const formatDateElement = (dateElement) => String(dateElement).padStart(2, '0');

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const timePart = `${formatDateElement(date.getHours())}:${formatDateElement(date.getMinutes())}:${formatDateElement(date.getSeconds())}`;
  const shortYear = date.getFullYear().toString().substr(2, 2);
  const datePart = `${formatDateElement(date.getDate())}.${formatDateElement(date.getMonth() + 1)}.${shortYear}`;
  return `${timePart} ${datePart}`;
};

const handleResponse = (res) => {
  const messagesTable = document.getElementById('messages');

  for (const { from, subject, timestamp } of res.messages) {
    const headerRow = document.createElement('tr');
    headerRow.classList.add('tableRow');
    messagesTable.prepend(headerRow);

    const tableCellFrom = document.createElement('td');
    tableCellFrom.classList.add('tableCell');
    tableCellFrom.textContent = from;
    headerRow.appendChild(tableCellFrom);

    const tableCellSubject = document.createElement('td');
    tableCellSubject.classList.add('tableCell');
    headerRow.appendChild(tableCellSubject);

    const tableCellTime = document.createElement('td');
    tableCellTime.classList.add('tableCell');
    tableCellTime.textContent = formatDate(timestamp);
    headerRow.appendChild(tableCellTime);

    if (subject.length > 15) {
      tableCellSubject.textContent = `${subject.substr(0, 15)}...`;
    } else {
      tableCellSubject.textContent = subject;
    }
  }
};

const handleError = (err) => {
  console.error(err);
};

interval(30 * 1000).pipe(
  startWith(0),
  mergeMap(() => ajax.getJSON(URL)),
).subscribe(handleResponse, handleError);

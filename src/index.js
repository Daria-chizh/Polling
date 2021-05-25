const messages = document.getElementById('messages');

// const stream$ = new Observable(observer => {
  const headerRow = document.createElement('tr');
  headerRow.classList.add('headerRow');
  messages.appendChild(headerRow);

  const tableCell = document.createElement('td');
  tableCell.classList.add('tableCell');
  tableCell.textContent = '2';
  headerRow.appendChild(tableCell);



// });
// stream$.subscribe(v => console.log(v));

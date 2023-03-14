const createList = (setIngredientList, startWeek) => {
  // calculates the start and end of the week
  const currentDay = new Date();
  const dateOffset = currentDay.getDay();
  startWeek.setDate(currentDay.getDate() - dateOffset);
  let [month, day, year] = startWeek.toLocaleDateString().split('/');
  if (parseInt(month) < 10) {
    month = '0' + month;
  }
  if (parseInt(day) < 10) {
    day = '0' + day;
  }
  const start = `${year}-${month}-${day}`;
  const item = localStorage.getItem('user');
  const person = JSON.parse(item);
  const userId = person.userid;
  const bearerToken = person ? person.accessToken : '';
  fetch(`http://localhost:3010/v0/groceryList?mealsid=${userId}&firstDay=${start}`, {
    method: 'get',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((json) => {
      setIngredientList(json.checklist ?? json[0].checklist);
    });
};

export default createList;

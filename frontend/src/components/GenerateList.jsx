const createList = (setIngredientList, startWeek) => {
  const startDay = startWeek.toISOString().split('T')[0];
  const item = localStorage.getItem('user');
  const person = JSON.parse(item);
  const userId = person.userid;
  const bearerToken = person ? person.accessToken : '';
  fetch(`http://localhost:3010/v0/groceryList?mealsid=${userId}&firstDay=${startDay}`, {
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
      const checklist = {...json};
      setIngredientList(checklist);
    });
};

export default createList;

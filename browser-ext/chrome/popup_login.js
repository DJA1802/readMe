const store = require('./store');

console.log('hello world');

function handleSubmit (evt) {
  evt.preventDefault();
  const formName = evt.target.name;
  const email = evt.target.email.value;
  const password = evt.target.password.value;
  // console.log(email, password, formName);
  dispatch(auth(email, password, formName));
}

document.getElementById('login-form').onsubmit = handleSubmit;

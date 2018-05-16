function message () {
  console.log('successful ok');
  var div = document.createElement('div');
  document.body.appendChild(div);
  div.style.position = 'fixed';
  div.style.height = '100px';
  div.style.width = '100px';
  div.style.backgroundColor = 'red';
  div.style.top = '0px';
  div.style.zIndex = '100';
}

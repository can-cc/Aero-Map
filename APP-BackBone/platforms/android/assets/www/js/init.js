(function(){
  if(localStorage.getItem("name")){
    alert(localStorage.getItem("name"));
  } else {
    localStorage.setItem("name", "fucfuc");
    alert("Seted!");
  }
}());
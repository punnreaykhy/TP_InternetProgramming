//static user accounts
var email = "gic@gmail.com";
var password = "Gic123";
var cookStoreDur = 30;  //set 30s to the cookie store



//function to get cookie value by name
function getCookie(cookiename) {
    let name = cookiename + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

//function login
function login(){
    //set cookie value
    var date = new Date();
    date.setTime(date.getTime()+(cookStoreDur*1000));
    document.cookie="email=gic@gmail.com;expires="+date.toUTCString();
    
    //check user account`
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    console.log(email, password);

    //retrieve data from input in local storage
    if(this.email === email && this.password === password && document.cookie === "email=gic@gmail.com") {
        location.href="./home.html" ;
        
    }
}

//function logout button
function logout(){
    location.href = "./index.html";
}

//function for reload home page when cookie is expired
function cookieExpired(){
    var cookieValue = getCookie("email");
    if(cookieValue != "gic@gmail.com"){
        location.href = "./index.html";
    }
    document.getElementById("logoutDura").innerHTML = `You will be automatically logged out after ${cookStoreDur} seconds`;
}
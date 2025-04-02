export function storeUserName(name){
    localStorage.setItem('userName', name);
    console.log(localStorage.getItem('userName'));
}

export function getUserName(){
    return localStorage.getItem('userName');
}
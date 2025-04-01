let userName;

export function storeUserName(name){
    userName = name;
    console.log(userName);
}

export function getUserName(){
    console.log(userName);
    return userName;
}
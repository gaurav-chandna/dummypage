let myVariable: string = "hello there";
console.log(myVariable);
let myName ={
    firstName: "Gaurav",
    lastName: "chandna" ,
    fullName : ()=> {
        console.log(this);
        return(this.firstName+this.lastName);
    }

}

let someName= myName.fullName();
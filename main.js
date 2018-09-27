var _this = this;
var myVariable = "hello there";
console.log(myVariable);
var myName = {
    firstName: "Gaurav",
    lastName: "chandna",
    fullName: function () {
        console.log(_this);
        return (_this.firstName + _this.lastName);
    }
};
var someName = myName.fullName();


// let age: number = 20;
// this line throws an error at compile time
// because ts is a statically typed language
// age = 'a';


// using this code to check out the debugger
// let age: number = 20;
// if(age<50)
//     age += 10
// console.log(age);   

// when we initialize a variable, the compiler knows the type
// let sales = 123_456_789;
// let course = 'TypeScript';
// let is_published = true;

// if we declare without initializing
// all the compiler knows is that this 
// variable is of type any, something we generally want to avoid
// let level;
// level = 1;
// level = 'a';


// this code throws error:
// Parameter 'document' implicitly has an 'any' type.
// this is because tsconfig: "noImplicitAny": true,
// function render(document){
//     console.log(document);
// }

// if we want to initialize an empty array
// we have to explicitly apply a type annotation
// let numbers: number[] = [];

// the second assignment will throw an error because
// we are assigning indexs with two different types
// numbers[0] = 1;
// numbers[1] = '1';

// One amazing feature of TS is because it knows the array type (number[])
// we now get intellisense for all of the available array methods!!!
// numbers.forEach(n => n.valueOf());


// TUPLES - used mostly for [key, value] pairs
// 1, 'James'
// if we explicitly apply this type annotation
// TS will throw a compilation error anytime our initialization
// does not follow the rule of the annotation which is in this case:
//  -requires an array length of 2
//  -[0] is a number and [1] is a string
// let user: [number, string] = [1, 'James'];
// Note: once a again each index of user will have available to it
// intellisense of all of the available methods of that type!!


// ENUMS
// const small = 1;
// const medium = 2;
// const large = 3;

// PascalCase - first letter is UPPERCASE
//  -by default the compiler will assign values:
//  {Small = 0, Medium = 1, Large = 2}
//  - we can explicitly assign values like this:
//      enum Size {Small = 's', Medium = 'm', Large = 'l'}
// defining enums using const generates more optimized JS code
// const enum Size {Small, Medium, Large};
// let mySize: Size = Size.Medium;
// console.log(mySize);


// FUNCTIONS

// using TS we SHOULD explicitly annotate the return type

// BAD example
// function calculateTax(income: number){
//     return 0;
// }

// GOOD example
// NOTE: we SHOULD turn on "noUnusedParameters": true, in tsconfig
// in order to warn us of unused parameters
// function calculateTax(income: number): number{
//     return 0;
// }

// function calculateTax(income: number): number{
//     if (income < 50_000)
//     return income * 1.2;
//     // if the if statement is false then return is void
//     // which is not aligned with our explicit return type!
// }

// function calculateTax(income: number): number{   
//     // let x; because "noUnusedLocals": true, this line throws error
//     if (income < 50_000)
//     return income * 1.2;
//     // here all paths return a number
//     return income * 1.3;
// }

// function calculateTaxTwo(income: number, taxYear: number): number{   
//     if (taxYear < 2022)
//     return income * 1.2;
//     return income * 1.3;
// }

// our function calls must be aligned with our definitions
// in this case that means our call requires 3 arguments
// calculateTaxTwo(10_000, 2022, 1); // This call is invalid because of third arg
// calculateTaxTwo(10_000, 2022); // VALID


// USING OPTIONAL PARAMETERS

// first approach is to use ? operator for indicating an optional parameter
// function calculateTaxThree(income: number, taxYear?: number): number{ 
//     // now that tax year is optional we need to account for that in our body  
//     // this OR operator indicates that if taxYear is undefined, default to 2022
//     if ((taxYear || 2022) < 2022)
//     return income * 1.2;
//     return income * 1.3;
// }

// heres a better approach
// define default value with parameter
// function calculateTaxThree(income: number, taxYear = 2022): number{ 
//     if (taxYear < 2022)
//     return income * 1.2;
//     return income * 1.3;
// }
// calculateTaxThree(10_000); // taxYear will default to 2022
// calculateTaxThree(10_000, 2019); // taxYear is explicitly set to 2019



// OBJECTS

// let employee = {id: 1 };
// // throws error because this assingment 
// // of name does not fit object shape as defined
// employee.name = 'James'; 

// in order to fix this problem we can 
// explicitly apply a type annotation to our object
// just like all other variables we have worked with already

// we have two options
// 1. NOT OPTIMAL - set optional
// let employee: {
//     id: number,
//     name?: string
// } = {id: 1};

// 2. set unused to empty string
// let employee: {
//     id: number,
//     name: string
// } = {id: 1, name: ''};

// In many cases we will want to use
// an id property that we don't want to modify
// we can use the readonly modifier to indicate this
// let employee: {
//     readonly id: number,
//     name: string
// } = {id: 1, name: 'James'};
// now this line throws an error because id cannot be reassigned
// employee.id = 1; 

// handling object methods
// let employee: {
//     readonly id: number,
//     name: string,
//     // here we need to define the method
//     retire: (date: Date) => void
// } = {
//     id: 1, 
//     name: 'James',
//     // here we initialize our retire method
//     retire: (date: Date) => {
//         console.log(date);
//     }
// };


// We can use a TYPE ALIAS to define a CUSTOM TYPE
// Now we have a reusable template when defining Employee objects
// type Employee = {
//     readonly id: number,
//     name: string,
//     retire: (date: Date) => void
// } 

// // now we simply initialize our employee object
// // by explicitly annotating with type Employee
// const employee: Employee ={
//     id: 1, 
//     name: 'James',
//     retire: (date: Date) => {
//         console.log(date);
//     }
// };


// UNION TYPES

// in this definition weight can be either a number or a string
// function kgToLbs(weight: number | string): number {
//     // at this point the compiler doesn't know if weight is
//     // a number or a string, to account for this we can conditionally
//     // check when weight is either type and perform the appropriate
//     // operation from there. This method is called NARROWING
//     if (typeof weight === 'number'){
//         // if number return calculation
//         return weight * 2.2;
//     }
//     else{
//         // else parse the string to a number and return the calculation
//         return parseInt(weight) * 2.2
//     }
// }

// kgToLbs(10);
// kgToLbs('10kg');


// INTERSECTION TYPES
type Draggable = {
    drag: () => void
};

type Resizable = {
    resize: () => void
};

// UIWidget is Draggable and Resizable
// this means that it is an INTERSECTION TYPE
// of the Draggable and Resizable types
type UIWidget = Draggable & Resizable;

// now textBox is an object instance of type UIWidget
// that has all props and methods of Dragable and Resizable types
let textBox: UIWidget = {
    drag: () => {},
    resize: () => {}
}

// LITERAL TYPES

// Literal (exact, specific)
// let quantity: 50;

// now quantity can be either 50 or 100
// let quantity: 50 | 100 = 100;

// we can make this more useful by 
type Quantity = 50 | 100;
let quantity: Quantity = 100;

type Metric = 'cm' | 'inch';


// NULLABLE TYPES

// function greet(name: string){
//     // cannot call this method on null value
//     console.log(name.toUpperCase());
// }
//greet(null); // null cannot be applied to type string as is

// Now name is nullable...
function greet(name: string | null | undefined){
    if (name){
        console.log(name.toUpperCase());
    }
    else{
        // ...and our code can handle all cases
        console.log('Hola!');
    }
}


// OPTIONAL CHAINING

// type Customer = {
//     birthday: Date
// }

// // returns a customer if it exists, else returns null
// function getCustomer(id: number): Customer | null | undefined{
//     return id === 0 ? null : {birthday: new Date() };
// }

// customer will be null
// let customer = getCustomer(0);
// this if can be written better with TS
// if (customer !== null && customer !== undefined){
//     console.log(customer.birthday);
// }
// let customer = getCustomer(0);
// Optional property access operator
// console.log(customer?.birthday);

// let customer = getCustomer(1);
// console.log(customer?.birthday);

// ********************************

// this time we're gonna make birthday optional
// type Customer = {
//     birthday?: Date
// }

// // returns a customer if it exists, else returns null
// function getCustomer(id: number): Customer | null | undefined{
//     return id === 0 ? null : {birthday: new Date() };
// }

// let customer = getCustomer(0);

// if (customer !== null && customer !== undefined){
//     // here we can call the getFullYear() method and log it
//     // only if customer AND birthday exist
//     console.log(customer?.birthday?.getFullYear());
// }

// Optional element access operator
// customers?.[0] // attempts to access the first element of customers if it exists

// Optional call
let log: any = null;
// log will only execute if log is an actual function
log?.('a');
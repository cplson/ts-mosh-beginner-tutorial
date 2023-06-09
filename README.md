
DESCRIPTION
This project was the result of following allong with <a href="https://www.youtube.com/@programmingwithmosh">Mosh's</a> TS tutorial for beginners <a href="https://www.youtube.com/watch?v=d56mG7DezGs&ab_channel=ProgrammingwithMosh">course</a> on youtube.

PREREQUISITES
Solid familiarity with JS

SETUP

install ts: npm i -g typescript  
create and configure tsconfig.json: tsc --init  
create src file in project root directory 
inside tsconfig uncomment these lines:  
    - "rootDir": "./src", <--- set directory to "./src"  
    - "outDir": "./dist", <--- set directory to "./dist"  
    - "removeComments": true,  
    - "noEmitOnError": true,  
    -"sourceMap": true,  
    -"noUnusedLocals": true,   
    -"noUnusedParameters": true,  
    -"noImplicitReturns": true,  

now that tsconfig is configured you can compile simpy by typing tsc in terminal.



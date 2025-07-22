You just need to clone your project first. You copy a link from a repo and clone it
```
git clone https://github.com/Killer0p/LogIn-SignUp.git
```

After you clone, open terminal and cd Backend and write 
```
npm i
```
 after this create a .env file in backend and add your 

```
PORT=
MONGO_URI=
EMAIL_USER=
EMAIL_PASS=
JWT_SECRET_KEY=
```
in your .env file 
you need to write 
```
cd Backend
```
 in terminal and 
 ```
 npm start
 ```
  it will run Backend
After this, you need to open new terminal then write 
```
cd Frontend
```
 in terminal start your code writing 
 ```
 npm run dev 
 ```
You also need to install all the dependencies just write 
```
npm i
```
in Frontend. 
In Frontend you also need to change auth.js there is a `http://localhost:7002/api`; add your PORT as I am using `7002` which is my backend port use your PORT.
After this, run your frontend and Backend again


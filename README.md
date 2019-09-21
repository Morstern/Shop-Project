# Shop-Project
CRUD Application created with MySQL, Express.js, React.js, Node.js stack 

My first attempt with programming web application.
Decided to pick React.js - since it's becomming very popular library.

This project consist of 2 sub-projects:
- backend (express.js, node.js, sequelize as an ORM)
- frontend (react.js + several third-party libraries, moment.js and vanilla javascript and Bootstrap 4)

The whole purpose was practicing:
- how to use React.js framework
- learning components and react-hooks (Later I decided to use just react-hooks, since it's modern plus it takes less space)
- learning how to consume api (fetch with react-hooks, send data)
- learning HTML5, CSS (mainly bootstrap)

For database it uses MySQL, it requires already created database "shop" and two tables:
- "clients"
- "orders"

I decided to use Database First approach - because I wasn't familiar with creating database by using Sequelize (ORM).
Furthermore, I believe that it's better to create it by your hand - you've more control over certain things (such as foreign keys, specific length of fields)

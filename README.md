# vulnerable-bulletin-board
![License](https://img.shields.io/badge/Licence-MIT-blue.svg)
![React](https://img.shields.io/badge/React-61DAF8)
![Node.js](https://img.shields.io/badge/Node.js-339933.svg)
![Express](https://img.shields.io/badge/Express-000000.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248.svg)<br>
This website is created for the purpose of the 2021 KERT Summer Vacation Project: Web Secure Coding. This is purposely made vulnerable for web secure coding and web hacking. 

## Features
- You can register, login and logout.
- Posts can be written, deleted, and edited.
- You can edit and delete only the posts you wrote through authentication.

## How to exeucte
1. Clone the repository
```
git clone https://github.com/scv1702/vulnerable-bulletin-board/
```

2. Change the directory to `vulnerable-bulletin-board`
```
cd vulnerable-bulletin-board
```

3. Create a `DB_KEY.txt` file and enter the mongoDB Atlas connection string

4. Install dependencies from `package.json` for Express
```
npm install
```

5. Change the directory to `client` and Install dependencies from `package.json` for React.js
```
cd client
npm install
```

6. Change the directory to `..` and Start the Express and React server
```
cd ..
npm start
```

7. Go to http://localhost:3000

## Contact
You can contact me via e-mail (scv1702@gmail.com).

## Reference
- [A MEAN Blog Node JS 첫걸음: 게시판 만들기](https://www.a-mean-blog.com/ko/blog/Node-JS-%EC%B2%AB%EA%B1%B8%EC%9D%8C/%EA%B2%8C%EC%8B%9C%ED%8C%90-%EB%A7%8C%EB%93%A4%EA%B8%B0)
- https://github.com/ahngo13/TodayILearned
- https://github.com/ahngo13/TodayILearned_server

## License

<img align="right" src="http://opensource.org/trademarks/opensource/OSI-Approved-License-100x137.png">

The class is licensed under the [MIT License](http://opensource.org/licenses/MIT):

Copyright &copy; 2021 [Changyu Shin](http://github.com/scv1702)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# Oriol Escolar's Todo Assignment

In this document I will give a bit of a techincal breakdown of the technologies I used and instructions to start and test everything.

## Structure

The project is separated in two folders:

- App (Frontend)
- Server (Backend)

## App

To develop the app I've used Vue with Vite, and for the tesitng I've used Vitest.

To start the app execute the following command:

```sh
npm run dev
```

To test the app execute the following command:

```sh
npm run test
```

To see the test coverage of the app execute the following command:

```sh
npm run test-coverage
```

## Server

To develop the Server I've used NodeJS with Express framework and MongoDB with Mongoose framework. For the testing of the server logic I've used mocha.

To start the app execute the following command:

```sh
npm run start
```

To test the app execute the following command:

```sh
npm run test
```

To see the test coverage of the app execute the following command:

```sh
npm run test-coverage
```


## Comments

I've added the server and app `.env` files just for demonstration, in real environments these files should not be in the repository.

## Things I would have liked to do / improved

For the server side, in an ideal case I would have also tested the router and not only the model's logic.

As for the App, as I told Yon, I've mainly worked with ReactJS and did some tests out of curiosity with Vue2, so I've faced some issues that I haven't been able to figure out with the limited time I had available. The main issues / things I would have liked to do were:

- **Using SCSS:** I tried to use scss instead of basic css. I managed to import scss files but these files weren't applying to the correct scope, affecting all the site instead of just the components, so after some time trying to make it work, I ended up going with basic css.

- **Better Vue testing:** As I've never really worked with Vue outside my own curiosity, it was the first time I tried testing Vue components. I decided to use Vitest for this, and managed to test some things. I eventually faced problems when trying to test api calls and it kept me from testing all the components in depth. Again, in an ideal case, this would not have been an issue without time restrictions .

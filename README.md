# Mi Aguila Challenge

This is a really simple project built with Nextjs and Typescrip

## Run it local

- Create an `.env` file at the root of the project with this variable.

```
  JWT_KEY = "1234567"
```

Then install the dependencies with `npm install` and run it with `npm run dev`

## How to use it?


You can test it locally on enter this [link](https://mi-aguila.vercel.app/ingresar)

Use this user to enter the app.

```
  email: example1@example.com
  password: $2y$10$mj1OMFvVmGAR4gEEXZGtA          
```


## Notes

1. The form is validated with `formik` and `yup`.

2. I used `styled-components` for the mockup and the design in general.

3. The users are with `axios`.

4. For the task page I build a simple graphql api on Hasura, this is the endpoint `https://mi-aguila-challenge.hasura.app/v1/graphql`.

5. I used `jwt` for managging the session.
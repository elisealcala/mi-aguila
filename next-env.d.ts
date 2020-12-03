/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'bcryptjs'

declare module 'jsonwebtoken'

declare module 'js-cookie'
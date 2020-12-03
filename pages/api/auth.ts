import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextApiRequest , NextApiResponse} from 'next'


const KEY = process.env.JWT_KEY;

const USERS = [
  {
    id: 1,
    email: 'example1@example.com',
    password: '$2y$10$mj1OMFvVmGAR4gEEXZGtA',
    createdAt: '2020-06-14 18:23:45',
  },
  {
    id: 2,
    email: 'example2@example.com',
    password: '$2y$10$mj1OMFvVmGAR4gEEXZGtA',
    createdAt: '2020-06-14 18:23:45',
  },
  {
    id: 3,
    email: 'example3@example.com',
    password: '$2y$10$mj1OMFvVmGAR4gEEXZGtA',
    createdAt: '2020-06-14 18:23:45',
  },
  {
    id: 4,
    email: 'example4@example.com',
    password: '$2y$10$mj1OMFvVmGAR4gEEXZGtA',
    createdAt: '2020-06-14 18:23:45',
  },
];

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  try {
    switch (method) {
      case 'POST':

        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(400).json({
            status: 'error',
            error: 'Request missing username or password',
          });
        }

        const user = USERS.find(user => {
          return user.email === email;
        });

        if (!user) {
          res.status(400).json({ status: 'error', error: 'User Not Found' });
        }

        const userId = user?.id
        const userEmail = user?.email
        const userPassword = user?.password
        const userCreated = user?.createdAt

        bcrypt.compare(password, userPassword).then((isMatch: any) => {

          if (isMatch) {
            const payload = {
              id: userId,
              email: userEmail,
              createdAt: userCreated,
            };

            jwt.sign(
              payload,
              KEY,
              {
                expiresIn: 300, // 5 minutes
              },
              (_: any, token: string) => {

                res.status(200).json({
                  success: true,
                  token: 'Bearer ' + token,
                });
              },
            );
          } else {
            res
              .status(400)
              .json({ status: 'error', error: 'Password incorrect' });
          }
        });
        break;
      case 'PUT':
        break;
      case 'PATCH':
        break;
      default:
    }
  } catch (error) {
    throw error;
  }
};
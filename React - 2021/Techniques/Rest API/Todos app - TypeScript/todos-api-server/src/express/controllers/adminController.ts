/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */

import express from 'express';

import checkMongoConnection from '../middleware/checkMongoConnection';
import validateGetRequest from '../middleware/validateGetRequest';
import validatePostRequest from '../middleware/validatePostRequest';

import userValidationSchema from '../validationSchemas/user';

import responseSuccess from '../responseHandlers/success';

import UserModel from '../../mongo/schemas/user';

class AdminController {
  private static controller: AdminController;

  private router: express.Router;

  private constructor() {
    this.router = express.Router();
  }

  private configure(): void {
    /*
    curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?searchFor=firstName&searchTerm=s
    curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?searchFor=firstName&searchTerm=p

    curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?sortBy=firstName&sortOrder=asc
    curl -X GET -H "Accept: application1/json" http://127.0.0.1:5000/admin/users/?sortBy=firstName&sortOrder=asc
    curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?sortBy=createdAt&sortOrder=desc
    curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?searchFor=firstName&searchTerm=s
    curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?searchFor=lastName&searchTerm=k
    curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?searchFor=firstName&searchTerm=s&sortBy=firstName&sortOrder=asc
    curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users
    curl -X GET -H "Accept: application/json1" http://127.0.0.1:5000/admin/users
    */
    this.router.get(
      '/users',
      [checkMongoConnection, validateGetRequest],
      this.getUsers,
    );

    /*
    curl -X POST --data '{"firstName":"Sven", "lastName":"Kohn", "email":"sven@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json1" http://127.0.0.1:5000/admin/user/add
    curl -X POST --data '{"firstName":"Sven", "lastName":"Kohn", "email":"sven@mindprobe"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
    curl -X POST --data '{"firstName":"Sven11 Michel-ñ", "lastName":"Kohn", "email":"sven@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add

    curl -X POST --data '{"firstName":"Sven", "lastName":"Kohn", "email":"sven@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
    curl -X POST --data '{"firstName":"Simon", "lastName":"Weisberger", "email":"simon@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
    curl -X POST --data '{"firstName":"Barbara", "lastName":"Massari Nola", "email":"barbara@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
    curl -X POST --data '{"firstName":"Valentina", "lastName":"Kohn", "email":"valentina@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
    curl -X POST --data '{"firstName":"Thomas", "lastName":"Kohn", "email":"thomas@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
    */
    this.router.post(
      '/user/add',
      [checkMongoConnection, validatePostRequest(userValidationSchema)],
      this.addUser,
    );
  }

  private getUsers = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const users = await UserModel.getUsersByQuery(req.query);
      console.log(users);
      // console.log(users[0].constructor.name);
      responseSuccess(req, res, 200, 'Sending user data', users);
      // users[0] = { foo: 'foo' };
      // console.log(JSON.stringify(users[0].constructor.name));
      // void users[0].getUsers1();
      /* if (Array.isArray(users)) {
        responseSuccess(req, res, 200, 'Sending user data', users);
      } */
      // throw new Error('foo');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  private addUser = (req: express.Request, res: express.Response): void => {
    console.log(req.body);
    responseSuccess(req, res, 200, 'OK');
  };

  static create(): express.Router {
    if (typeof this.controller === 'undefined') {
      this.controller = new AdminController();
      this.controller.configure();
    }
    return this.controller.router;
  }
}

export default AdminController;

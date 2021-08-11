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
      const userDoc = new UserModel();
      console.log(await userDoc.getUsers1());

      console.log(await UserModel.getUsers2());

      /* const result = await UserModel.find({})
        .select({
          updatedAt: 0,
          __v: 0,
        })
        .lean();

      console.log(result); */

      // const Model1 = model('User');
      // const user1 = new Model1();

      // const userModel: Model<unknown, {}, {}> = new UserModel();
      // const users = await userModel.getUsers(req.query);
    } catch (error) {
      console.log(error);
    }

    responseSuccess(req, res, 200, 'Sending user data', [{ first: 'Sven', last: 'Kohn' }]);
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

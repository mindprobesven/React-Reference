import express from 'express';

import checkMongoConnection from '../middleware/checkMongoConnection';
import validateGetRequest from '../middleware/validateGetRequest';
import validatePostRequest from '../middleware/validatePostRequest';
import validateQuery from '../middleware/validateQuery';

import idValidationSchema from '../validationSchemas/id';
import userValidationSchema from '../validationSchemas/user';
import userQuerySchema from '../validationSchemas/userQuery';

import responseSuccess from '../responseHandlers/success';
import responseError from '../responseHandlers/error';

import UserModel from '../../mongo/schemas/user';

class AdminController {
  private static controller: AdminController;

  private router: express.Router;

  private constructor() {
    this.router = express.Router();
  }

  private configure(): void {
    /*
    curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?searchFor=sven
    curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?sortOrder=asc
    curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?sortOrder=aSc
    curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?searchFor=first%20Name&searchTerm=s&sortBy=firstName&sortOrder=asc
    curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?searchFor=first-Name&searchTerm=s&sortBy=firstName&sortOrder=asc
    curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?searchFor1=firstName&searchTerm=s&sortBy=firstName&sortOrder=asc
    curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?searchFor=firstNamefirstNamefirstNamefirstNamefirstNamefirstNamefirstNamefirstNamefirstNamefirstNamefirstNamefirstNamefirstNamefirstNamefirstNamefirstNamefirstNamefirstNamefirstNamefirstName&searchTerm=s&sortBy=firstName&sortOrder=asc

    curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?searchFor=firstName&searchTerm=s&sortBy=firstName&sortOrder=asc
    curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users
    */
    this.router.get(
      '/users',
      [
        checkMongoConnection,
        validateGetRequest,
        validateQuery(userQuerySchema),
      ],
      this.getUsers,
    );

    /*
    curl -X POST --data '{"firstName":"Sven", "lastName":"Kohn", "email":"sven@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
    curl -X POST --data '{"firstName":"Simon", "lastName":"Weisberger", "email":"simon@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
    curl -X POST --data '{"firstName":"Barbara", "lastName":"Massari Nola", "email":"barbara@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
    curl -X POST --data '{"firstName":"Valentina", "lastName":"Kohn", "email":"valentina@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
    curl -X POST --data '{"firstName":"Thomas", "lastName":"Kohn", "email":"thomas@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
    */
    this.router.post(
      '/user/add',
      [
        checkMongoConnection,
        validatePostRequest(userValidationSchema),
      ],
      this.addUser,
    );

    /*
    curl -X POST --data '{"id":"611a475b0c5aee3a699b1f9a", "firstName":"Sven Michel", "lastName":"Kohn", "email":"sven@mindprobe.io", "validated":true}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/edit'
    */
    this.router.post(
      '/user/edit',
      [
        checkMongoConnection,
        validatePostRequest(idValidationSchema),
        validatePostRequest(userValidationSchema),
      ],
      this.editUser,
    );

    /*
    curl -X POST --data '{"id":"611a475b0c5aee3a699b1f9a"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/delete
    */
    this.router.post(
      '/user/delete',
      [
        checkMongoConnection,
        validatePostRequest(idValidationSchema),
      ],
      this.deleteUser,
    );
  }

  private getUsers = async (
    req: express.Request,
    res: express.Response,
  ): Promise<void> => {
    try {
      const users = await UserModel.getUsersByQuery({ ...req.query });
      responseSuccess(req, res, 200, 'Sending user data', users);
    } catch (error) {
      if (error instanceof Error) {
        responseError(req, res, 400, null, error);
      }
    }
  };

  private addUser = async (
    req: express.Request,
    res: express.Response,
  ): Promise<void> => {
    try {
      const newUserDoc = new UserModel({ ...req.body });

      const isDuplicate = await newUserDoc.isEmailDuplicate();

      if (isDuplicate) {
        const validationError = [{
          value: newUserDoc.email,
          msg: 'Email exists',
          param: 'email',
          location: 'body',
        }];
        responseError(req, res, 400, 'Email exists', validationError);
        return;
      }

      await newUserDoc.save();

      responseSuccess(req, res, 200, 'New user created');
    } catch (error) {
      if (error instanceof Error) {
        responseError(req, res, 400, null, error);
      }
    }
  };

  private editUser = async (
    req: express.Request,
    res: express.Response,
  ): Promise<void> => {
    try {
      const userId = String((req.body as Record<string, unknown>).id);
      const docToEdit = await UserModel.getUserById(userId);

      if (!docToEdit) {
        responseError(req, res, 400, 'User not found', null);
        return;
      }

      const currentEmail = docToEdit.email;

      docToEdit.set({ ...req.body });

      const newEmail = docToEdit.email;

      if (newEmail !== currentEmail) {
        const isDuplicate = await docToEdit.isEmailDuplicate();

        if (isDuplicate) {
          const validationError = [{
            value: newEmail,
            msg: 'Email exists',
            param: 'email',
            location: 'body',
          }];
          responseError(req, res, 400, 'Email exists', validationError);
          return;
        }
      }

      await docToEdit.save();

      responseSuccess(req, res, 200, 'User updated');
    } catch (error) {
      if (error instanceof Error) {
        responseError(req, res, 400, null, error);
      }
    }
  };

  private deleteUser = async (
    req: express.Request,
    res: express.Response,
  ): Promise<void> => {
    try {
      const userId = String((req.body as Record<string, unknown>).id);
      const isDeleted = await UserModel.deleteUserById(userId);

      if (!isDeleted) {
        responseError(req, res, 400, 'User deletion failed', null);
        return;
      }
      responseSuccess(req, res, 200, 'User deleted successfully');
    } catch (error) {
      if (error instanceof Error) {
        responseError(req, res, 400, null, error);
      }
    }
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

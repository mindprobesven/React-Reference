/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */

import express from 'express';

import validateGetRequest from '../middleware/validateGetRequest';

import responseSuccess from '../responseHandlers/success';

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
      [validateGetRequest],
      this.getAllUsers,
    );
  }

  private getAllUsers = (req: express.Request, res: express.Response): void => {
    responseSuccess(req, res, 200, 'Sending user data', [{ first: 'Sven', last: 'Kohn' }]);
    // responseSuccess(req, res, 200, 'Sending 200 only');
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

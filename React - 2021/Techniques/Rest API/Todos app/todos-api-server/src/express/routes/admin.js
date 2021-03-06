/* eslint-disable max-len */
const express = require('express');

const checkMongoConnection = require('../middleware/checkMongoConnection');
const validateGetRequest = require('../middleware/validateGetRequest');
const validatePostRequest = require('../middleware/validatePostRequest');

const idValidationSchema = require('../validationSchemas/id');
const userValidationSchema = require('../validationSchemas/user');

const responseSuccess = require('../responseHandlers/success');
const responseError = require('../responseHandlers/error');

const UserModel = require('../../mongo/schemas/user');

const adminRouter = express.Router();

adminRouter.use(express.json());

/*
curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?sortBy=firstName&sortOrder=asc
curl -X GET -H "Accept: application1/json" http://127.0.0.1:5000/admin/users/?sortBy=firstName&sortOrder=asc
curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?sortBy=createdAt&sortOrder=desc
curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?searchFor=firstName&searchTerm=s
curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?searchFor=lastName&searchTerm=k
curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?searchFor=firstName&searchTerm=s&sortBy=firstName&sortOrder=asc
curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users
*/
adminRouter.get(
  '/users',
  [
    checkMongoConnection,
    validateGetRequest,
  ],
  async (req, res) => {
    try {
      const userModel = new UserModel();
      const users = await userModel.getUsers(req.query);

      return responseSuccess({
        req,
        res,
        message: 'Sending user data',
        payload: users,
      });
    } catch (error) {
      return responseError({ req, res, error });
    }
  },
);

/*
curl -X POST --data '{"firstName":"Sven", "lastName":"Kohn", "email":"sven@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
curl -X POST --data '{"firstName":"Simon", "lastName":"Weisberger", "email":"simon@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
curl -X POST --data '{"firstName":"Barbara", "lastName":"Massari Nola", "email":"barbara@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
curl -X POST --data '{"firstName":"Valentina", "lastName":"Kohn", "email":"valentina@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
curl -X POST --data '{"firstName":"Thomas", "lastName":"Kohn", "email":"thomas@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
*/
adminRouter.post(
  '/user/add',
  [
    checkMongoConnection,
    validatePostRequest(userValidationSchema),
  ],
  async (req, res) => {
    // At this point guaranteed:
    // There is a connection to the MongoDB
    // The input data is valid, sanitized and contains all required fields
    try {
      const userModel = new UserModel({ ...req.body });

      const isDuplicate = await userModel.isEmailDuplicate();
      if (isDuplicate) {
        return responseError({
          req,
          res,
          message: 'Email exists',
          payload: [{
            value: req.body.email,
            msg: 'Email exists',
            param: 'email',
            location: 'body',
          }],
        });
      }

      await userModel.save();

      return responseSuccess({
        req,
        res,
        message: 'New user created',
      });
    } catch (error) {
      return responseError({ req, res, error });
    }
  },
);

/*
curl -X POST --data '{"id":"60e5a0bbdea4cf620c439d48", "firstName":"Sven Michel", "lastName":"Kohn", "email":"sven@mindprobe.io", "validated":false}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/edit
curl -X POST --data '{"id":"60e5a0bbdea4cf620c439d48", "firstName":"Sven", "lastName":"Kohn", "email":"sven@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/edit
*/
adminRouter.post(
  '/user/edit',
  [
    checkMongoConnection,
    // First, validate the incoming user ID
    validatePostRequest(idValidationSchema),
    // Next, validate and sanitize the incoming user data
    validatePostRequest(userValidationSchema),
  ],
  async (req, res) => {
    try {
      // Next, check if a user with the ID exists
      const userModel = new UserModel();
      const docToEdit = await userModel.getUserById(req.body.id);

      if (!docToEdit) {
        throw new Error('User not found');
      }

      const currentEmail = docToEdit.email;
      const newEmail = req.body.email;

      // Next, update the user document with the incoming data
      docToEdit.set({ ...req.body });

      // Next, in case the email has changed, we need to do a duplicate check
      if (newEmail !== currentEmail) {
        const isDuplicate = await docToEdit.isEmailDuplicate();
        if (isDuplicate) {
          return responseError({
            req,
            res,
            message: 'Email exists',
            payload: [{
              value: req.body.email,
              msg: 'Email exists',
              param: 'email',
              location: 'body',
            }],
          });
        }
      }

      // Finally, we use save() to run the schema validation and if it passes, the user data is updated in the database.
      await docToEdit.save();

      return responseSuccess({
        req,
        res,
        message: 'User updated',
      });
    } catch (error) {
      return responseError({ req, res, error });
    }
  },
);

/*
curl -X POST --data '{"id":"60e58431be6b9b3fa92bc189"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/delete
*/
adminRouter.post(
  '/user/delete',
  [
    checkMongoConnection,
    validatePostRequest(idValidationSchema),
  ],
  async (req, res) => {
    try {
      const userModel = new UserModel();
      const isDeleted = await userModel.deleteUserById(req.body.id);

      if (!isDeleted) {
        throw new Error('Deleting the user failed');
      }

      return responseSuccess({
        req,
        res,
        message: 'User deleted successfully',
      });
    } catch (error) {
      return responseError({ req, res, error });
    }
  },
);

module.exports = adminRouter;

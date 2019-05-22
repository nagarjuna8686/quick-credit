import Joi from 'joi';
import mock from '../data/mock';
import db from '../data/connection';
import queries from '../data/queries';
import validate from '../helpers/validation';

class UserController {
  // Get all users
  static async getAllUsers(req, res) {
    try {
      const allUsers = await db.query(queries.allUsers);
      if (allUsers.rows.length === 0) {
        res.status(404).json({
          status: 404,
          error: 'No user found',
        });
      }
      return res.status(200).json({
        status: 200,
        successMessage: 'Users',
        data: allUsers.rows,
      });
    } catch (er) {
      return res.status(500).json({
        status: res.statusCode,
        error: `${er}`,
      });
    }
  }

  // Get a specific user details
  static async getSpecificUser(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const { error } = Joi.validate(
        {
          id,
        },
        validate.idParams,
      );
      if (error) {
        return res.status(400).json({
          status: res.statusCode,
          error: error.details[0].message, // error.details to view more about the error
        });
      }
      const user = await db.query(queries.getUserWithId, [id]);
      if (user.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'User is not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: {
          id: user.rows[0].id,
          email: user.rows[0].email,
          firstName: user.rows[0].firstname,
          lastName: user.rows[0].lastname,
          status: user.rows[0].status,
          address: user.rows[0].address,
          isAdmin: user.rows[0].isadmin,
          createdOn: user.rows[0].createdon,
        },
      });
    } catch (er) {
      return res.status(500).json({
        status: res.statusCode,
        error: `${er}`,
      });
    }
  }

  static verifyUser(req, res) {
    const { email } = req.params;
    const { error } = Joi.validate(
      {
        email,
      },
      validate.emailParams,
    );

    if (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: error.details[0].message, // error.details to view more about the error
      });
    }
    const user = mock.users.find(el => el.email === email);
    if (user) {
      user.status = 'verified';
      return res.status(200).json({
        status: 200,
        data: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          status: user.status,
          address: user.address,
          isAdmin: user.isAdmin,
          createdOn: user.createdOn,
        },
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'User is not found',
    });
  }
}

export default UserController;

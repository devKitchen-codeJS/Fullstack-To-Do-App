import { HttpStatus } from '@nestjs/common';
import { messages } from './messages';

const {
  USER_NOT_FOUND,
  // LOGIN_FAILED,
  // USER_NOT_ACTIVE_CHECK_EMAIL,
  USER_ALREADY_EXISTS,
  // AGE_IS_NOT_VERIFIED,
} = messages.USERS;
const { LOGIN_FAILED, USER_NOT_ACTIVE_CHECK_EMAIL, AGE_IS_NOT_VERIFIED } =
  messages.AUTH;

export const swaggerDocs = {
  USER: {
    GET_PREFERENCES: {
      SUMMARY: 'Retrieve user preferences',
      DESCRIPTION:
        'Fetches the saved preferences of a user based on their unique ID.',
      OK_DESCRIPTION: 'User preferences successfully retrieved',
    },
    PATCH_PREFERENCES: {
      SUMMARY: 'Update personal details & notification settings',
      DESCRIPTION:
        'Updates user personal information and/or notification settings by user ID.',
      OK_DESCRIPTION: 'User preferences successfully updated',
    },
    DELETE_USER: {
      SUMMARY: 'Delete user account',
      DESCRIPTION:
        'Permanently deletes the user account identified by the provided user ID.',
      OK_DESCRIPTION: 'User successfully deleted',
    },
    GET_ROLES: {
      SUMMARY: 'Retrieve user roles',
      DESCRIPTION:
        'Returns the list of roles assigned to a specific user by their ID.',
      OK_DESCRIPTION: 'User roles successfully retrieved',
    },
    API_PARAM: {
      USER_ID: 'User roles successfully retrieved',
    },
    GET_ALL_USERS: {
      SUMMARY: 'Retrieve all users',
      DESCRIPTION:
        'Fetches a paginated list of all users with optional sorting and filtering.',
      OK_DESCRIPTION: 'Users successfully retrieved',
    },
  },
  AUTH: {
    LOGIN: {
      SUMMARY: 'Authenticate user',
      DESCRIPTION:
        'Logs in a user using provided credentials and returns access/refresh tokens.',
      OK_DESCRIPTION: 'User successfully logged in.',
      NOT_FOUND_EXAMPLES: {
        NOT_FOUND: {
          message: USER_NOT_FOUND,
          error: 'Not Found',
          statusCode: HttpStatus.NOT_FOUND,
        },
        LOGIN_FAILED: {
          message: LOGIN_FAILED,
          error: 'Not Found',
          statusCode: HttpStatus.NOT_FOUND,
        },
      },
      BAD_REQUEST_EXAMPLES: {
        USER_IS_NOT_ACTIVE: {
          message: USER_NOT_ACTIVE_CHECK_EMAIL,
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
        },
      },
    },

    REFRESH_TOKEN: {
      SUMMARY: 'Refresh access token',
      DESCRIPTION: 'Generates a new access token using a valid refresh token.',
      OK_DESCRIPTION: 'Access token successfully refreshed.',
      RESPONSE: {
        status: HttpStatus.CREATED,
        description: 'token successfully refreshed',
        example: {
          access_token: '31c963f9-d274-438f-9d95-5c27130786f4',
          refresh_token: '31c963f9-d274-438f-9d95-5c27130786f4',
        },
      },
      BAD_REQUEST_EXAMPLES: {
        INVALID_TOKEN: {
          message: 'invalid or expired refresh token',
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
        },
      },
    },

    REGISTER: {
      SUMMARY: 'Register a new user',
      DESCRIPTION: 'Registers a new user account using the provided data.',
      CREATED_DESCRIPTION: 'User successfully registered.',
      BAD_REQUEST_EXAMPLES: {
        USER_ALREADY_EXISTS: {
          message: USER_ALREADY_EXISTS,
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
        },
        AGE_IS_NOT_VERIFIED: {
          message: AGE_IS_NOT_VERIFIED,
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
        },
      },
      NOT_FOUND_EXAMPLE: {
        message: USER_NOT_FOUND,
        error: 'Not Found',
        statusCode: HttpStatus.NOT_FOUND,
      },
      BODY_DESCRIPTION: 'Data required to register a new user',
      BODY_EXAMPLES: {
        valid: {
          summary: 'Valid input',
          value: {
            email: 'newuser@example.com',
            passwordHash: 'StrongPass123!',
            firstName: 'JohnDoe',
            lastName: 'JohnDoe',
            isAgeVerified: true,
          },
        },
        missingFields: {
          summary: 'Missing required fields',
          value: {
            email: '',
            passwordHash: '',
          },
        },
      },
    },
  },
};

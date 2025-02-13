export const swagger_response_schemas = {
    // *************** common schema format for errors ****************************
    not_found: (path = '/') => {
      return {
        status: 404,
        description: 'Resource Not Found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Resource not found',
            path,
            timestamp: '2025-02-12T12:00:00.000Z',
          },
        },
      };
    },
    unauthorized: (path = '/') => {
      return {
        status: 401,
        description: 'Unauthorized Access',
        schema: {
          example: {
            statusCode: 401,
            message: 'Unauthorized',
            path,
            timestamp: '2025-02-12T12:00:00.000Z',
          },
        },
      };
    },
    bad_request: (path = '/') => {
      return {
        status: 400,
        description: 'Bad Request',
        schema: {
          example: {
            statusCode: 400,
            message: 'Bad request',
            path,
            timestamp: '2025-02-12T12:00:00.000Z',
          },
        },
      };
    },
    forbidden: (path = '/') => {
      return {
        status: 403,
        description: 'Forbidden',
        schema: {
          example: {
            statusCode: 403,
            message: 'Access denied',
            path,
            timestamp: '2025-02-12T12:00:00.000Z',
          },
        },
      };
    },
    internal_server: (path = '/') => {
      return {
        status: 500,
        description: 'Internal Server Error',
        schema: {
          example: {
            statusCode: 500,
            message: 'Internal server error',
            path,
            timestamp: '2025-02-12T12:00:00.000Z',
          },
        },
      };
    },

  // ******************************** User Auth ***********************************************************
  user_register: () => {
    return {
      status: 201,
      description: 'Register for all user and admin',
      schema: {
        example: {
          statusCode: 201,
          message: 'Registration successful!',
          data: {
            user: {
              id: 1,
              email: "user123@gmail.com",
              role: "USER"
            },
          },
          timestamp: '2025-02-12T02:25:20.863Z',
        },
      },
    };
  },

  auth_login: () => {
    return {
      status: 200,
      description: 'Login for all users',
      schema: {
        example: {
          statusCode: 200,
          message: 'Login successful',
          data: {
            user: {
              id: 1,
              role: "USER",
              email: "user123@gmail.com"
            },
            token: 'jwt-token-string',
            refresh_token: "refresh jwt-token-string" 
          },
          timestamp: '2025-02-12T02:25:20.863Z',
        },
      },
    };
  },

  auth_refresh_token: () => {
    return {
      status: 200,
      description: 'Refreshed Token',
      schema: {
        example: {
          statusCode: 200,
          message: 'Token refreshed successfully',
          data: {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          },
          timestamp: '2025-02-12T02:25:20.863Z',
        },
      },
    };
  },

  get_user: () => {
    return {
      status: 200,
      description: 'User profile',
      schema: {
        example: {
          statusCode: 200,
          message: 'User profile',
          data: {
            user: {
              id: 1,
              role: "USER",
              email: "user123@gmail.com"
            },
          },
          timestamp: '2025-02-12T02:25:20.863Z',
        },
      },
    };
  },

  get_all_user: () => {
    return {
      status: 200,
      description: 'Users Listing',
      schema: {
        example: {
          statusCode: 200,
          message: 'Users Listing',
          data: [
            {
              id: 1,
              email: "user123@gmail.com",
              role: "USER"
            },
            {
              id: 3,
              email: "paresh123@gmail.com",
              role: "USER"
            }
          ],
          timestamp: '2025-02-12T02:25:20.863Z',
        },
      },
    };
  },

}
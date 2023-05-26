import users from '../mocks/users';

class UserController {
  index() {
    return users;
  }
}

export default new UserController();

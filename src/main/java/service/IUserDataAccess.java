package service;

import entity.User;
import user.requestconnect.exceptions.UserNotFoundException;

import java.util.ArrayList;

public interface IUserDataAccess {
    User getUser(String userId) throws UserNotFoundException;
    void saveUser(User user);
    void updateUser(User user);

    ArrayList<User> getUsers();
    void reset();
}
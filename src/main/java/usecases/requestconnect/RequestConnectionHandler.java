package usecases.requestconnect;

import entity.User;
import service.dao.IUserDAO;

import java.util.ArrayList;

public class RequestConnectionHandler {

    private final User user;
    private final User target;
    private final IUserDAO dataAccess;
    public RequestConnectionHandler(User user, User target, IUserDAO dataAccess) {
        this.user = user;
        this.target = target;
        this.dataAccess = dataAccess;
    }

    public void sendConnectionRequestToTarget() {
        ArrayList<String> userOutgoing = user.getOutgoingConnectionRequests();
        ArrayList<String> targetIncoming = target.getIncomingConnectionRequests();

        userOutgoing.add(target.getUsername());
        targetIncoming.add(user.getUsername());

        user.setOutgoingConnectionRequests(userOutgoing);
        target.setIncomingConnectionRequests(targetIncoming);

        dataAccess.updateUser(user);
        dataAccess.updateUser(target);
    }
}
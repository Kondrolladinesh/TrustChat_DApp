// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract ChatApp {

    // User Struct
    struct user {
        string name;
        friend[] friendList;
    }

    struct friend {
        address pubkey;
        string name;
    }

    struct message {
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct AllUserStruck {
        string name;
        address accountAddress;
    }

    AllUserStruck[] public getAllUsers;

    mapping(address => user) public userList;
    mapping(bytes32 => message[]) public allMessages;

    // CHECK USER EXIST
    function checkUserExists(address pubkey) public view returns (bool) {
        return bytes(userList[pubkey].name).length > 0;
    }

    // CREATE ACCOUNT
    function createAccount(string calldata name) external {
        require(!checkUserExists(msg.sender), "User already exists");
        require(bytes(name).length > 0, "UserName cannot be empty");

        userList[msg.sender].name = name;
        getAllUsers.push(AllUserStruck(name, msg.sender));
    }

    // GET UserName
    function getUsername(address pubkey) external view returns (string memory) {
        require(checkUserExists(pubkey), "User is not registered");
        return userList[pubkey].name;
    }

    // ADD FRIENDS
    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not registered!");
        require(msg.sender != friend_key, "User cannot add themselves as friends");
        require(!checkAlreadyFriends(msg.sender, friend_key), "These users are already friends");

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
    }

    function checkAlreadyFriends(address pubkey1, address pubkey2) internal view returns (bool) {
        if (userList[pubkey1].friendList.length > userList[pubkey2].friendList.length) {
            address tmp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = tmp;
        }
        for (uint256 i = 0; i < userList[pubkey1].friendList.length; i++) {
            if (userList[pubkey1].friendList[i].pubkey == pubkey2) return true;
        }
        return false;
    }

    function _addFriend(address me, address friend_key, string memory name) internal {
        friend memory newFriend = friend(friend_key, name);
        userList[me].friendList.push(newFriend);
    }

    // GET MY FRIENDS
    function getMYFriendList(address me) external view returns (friend[] memory) {
        return userList[me].friendList;
    }

    // get chat code
    function _getChatCode(address pubkey1, address pubkey2) internal pure returns (bytes32) {
        bytes32 hash;
        if (pubkey1 < pubkey2) {
            hash = keccak256(abi.encodePacked(pubkey1, pubkey2));
        } else {
            hash = keccak256(abi.encodePacked(pubkey2, pubkey1));
        }
        return hash;
    }

    // SEND message
    function sendMessage(address me, address friend_key, string calldata _msg) external {
        require(checkUserExists(me), "Create an account first");
        require(checkUserExists(friend_key), "User is not registered");
        require(checkAlreadyFriends(me, friend_key), "You are not friends with the given user");

        bytes32 chatCode = _getChatCode(me, friend_key);
        message memory newMsg = message(me, block.timestamp, _msg);
        allMessages[chatCode].push(newMsg);
    }

    // READ message
    function readMessage(address me, address friend_key) external view returns (message[] memory) {
        bytes32 chatCode = _getChatCode(me, friend_key);
        return allMessages[chatCode];
    }

    function getAllAppUser() public view returns (AllUserStruck[] memory) {
        return getAllUsers;
    }

    function broadcastMessage( address me,string calldata _msg) external {
        require(checkUserExists(me), "Create an account first");

        // Get the sender's friend list
        friend[] memory friends = userList[me].friendList;

        // Iterate through the friend list and send a message to each friend
        for (uint256 i = 0; i < friends.length; i++) {
            bytes32 chatCode = _getChatCode(me, friends[i].pubkey);
            message memory newMsg = message(me, block.timestamp, _msg);
            allMessages[chatCode].push(newMsg);
        }
    }
}

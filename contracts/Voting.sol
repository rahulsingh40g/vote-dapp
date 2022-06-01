pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Voting {
    struct Voter {
        bool hasVoted;
        uint256 party;
        string voterId;
        string passcode;
    }

    struct Party {
        string name;
        uint256 voteCount;
    }

    address public electionCommisioner;

    mapping(address => Voter) voters;

    Party[] public parties;

    string[] private votedPeople;

    constructor(string[] memory partyNames) {
        electionCommisioner = msg.sender;

        for (uint8 i = 0; i < partyNames.length; i++) {
            parties.push(Party({name: partyNames[i], voteCount: 0}));
        }
    }

    function canVote(string memory voterId) public view returns (bool) {
        console.log("---canVote function---");
        console.log("voterId: ", voterId);

        if (voters[msg.sender].hasVoted == true) {
            return false;
        }

        for (uint256 i = 0; i < votedPeople.length; i++) {
            if (
                keccak256(abi.encodePacked(votedPeople[i])) ==
                keccak256(abi.encodePacked(voterId))
            ) return false;
        }

        return true;
    }

    function vote(
        uint256 party,
        string memory voterId,
        string memory passcode
    ) public {
        console.log("---vote function---");
        console.log("msg.sender: ", msg.sender);
        console.log("party: ", party);
        console.log("voterId: ", voterId);
        console.log("passcode: ", passcode);

        require(canVote(voterId), "Already voted.");

        voters[msg.sender] = Voter(true, party, voterId, passcode);

        votedPeople.push(voterId);

        parties[party].voteCount += 1;
    }

    function voterSummary()
        public
        view
        returns (
            Voter memory voter_,
            Party[] memory parties_,
            string[] memory votedPeople_
        )
    {
        console.log("---voterSummary function---");
        console.log(
            "voters[msg.sender].hasVoted: ",
            voters[msg.sender].hasVoted
        );
        return (voters[msg.sender], parties, votedPeople);
    }

    function votedTo(string memory passcode_)
        public
        view
        returns (string memory votedParty_)
    {
        console.log("---votedTo function---");
        console.log("passcode_: ", passcode_);

        require(voters[msg.sender].hasVoted, "you have not voted yet");
        require(
            keccak256(abi.encodePacked(voters[msg.sender].passcode)) ==
                keccak256(abi.encodePacked(passcode_)),
            "Invalid Passcode"
        );

        votedParty_ = parties[voters[msg.sender].party].name;
    }

    function results() public view returns (Party[] memory parties_) {
        parties_ = parties;
    }
}

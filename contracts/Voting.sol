pragma solidity ^0.8.4;

contract Voting {
    struct Voter {
        string voterId;
        bool hasVoted;
    }

    struct Record {
        string passcode;
        uint256 party;
    }

    struct Party {
        string name;
        uint256 voteCount;
    }

    address public electionCommisioner;

    mapping(address => Voter) private voters;

    mapping(address => Record) private records;

    Party[] public parties;

    string[] private votedPeople;

    constructor(string[] memory partyNames) {
        electionCommisioner = msg.sender;

        for (uint8 i = 0; i < partyNames.length; i++) {
            parties.push(Party({name: partyNames[i], voteCount: 0}));
        }
    }

    function canVote(string memory voterId) public view returns (bool) {
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
        Voter storage sender = voters[msg.sender];

        require(canVote(voterId), "Already voted.");

        sender.hasVoted = true;
        sender.voterId = voterId;

        votedPeople.push(voterId);

        Record storage senderRecord = records[msg.sender];

        senderRecord.party = party;
        senderRecord.passcode = passcode;

        parties[party].voteCount += 1;
    }

    function votedTo(string memory passcode_)
        public
        view
        returns (string memory votedParty_)
    {
        require(voters[msg.sender].hasVoted, "you have not voted yet");
        require(
            keccak256(abi.encodePacked(records[msg.sender].passcode)) ==
                keccak256(abi.encodePacked(passcode_)),
            "Invalid Passcode"
        );

        votedParty_ = parties[records[msg.sender].party].name;
    }

    function winningParty() public view returns (uint256 winningParty_) {
        uint256 winningVoteCount = 0;
        for (uint256 p = 0; p < parties.length; p++) {
            if (parties[p].voteCount > winningVoteCount) {
                winningVoteCount = parties[p].voteCount;
                winningParty_ = p;
            }
        }
    }

    function winnerName() public view returns (string memory winnerName_) {
        winnerName_ = parties[winningParty()].name;
    }

    function results() public view returns (Party[] memory parties_) {
        parties_ = parties;
    }
}

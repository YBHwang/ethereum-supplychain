pragma solidity ^0.4.25;

contract Beer
{
    enum StateType {
        Creating,
        Created,
        TransitionRequestPending,
        InTransit,
        Completed,
        OutOfCompliance
    }

    StateType public currState;
    uint256  public FirstCount;
    uint256  public RequestedCount;
    string  public RequestedCounterparty;
    uint256  public UTime;
    uint256  public CTime;

    constructor() public
    {
        RequestedCounterparty = "";
        currState = StateType.Creating;
        FirstCount = 0;
    }

    functionQueryOrder() public view returns (string owner, StateType State, uint256 count, uint256 ctime, uint256 utime)
    {
        return (RequestedCounterparty, currState, RequestedCount, CTime, UTime);
    }

    functionInitLedger() public returns(bool success)
    {
        currState = StateType.Created;
        RequestedCounterparty = "";
        RequestedCount = 0;
        CTime = now;
        UTime = CTime

        return true;
    }

    functionStartTransfer(string newCounterparty, uint256 newCount) public returns(bool success)
    {
        if (currState != StateType.Created)
        {
            revert();
        }

        currState = StateType.TransitionRequestPending;
        RequestedCounterparty = newCounterparty;
        FirstCount = newCount;
        RequestedCount = FirstCount;
        UTime = now;

        return true;
    }

    functionRequestTransfer(string newCounterparty, uint256 newCount) public returns(bool success)
    {
        if (currState != StateType.InTransit)
        {
            revert();
        }

        currState = StateType.TransitionRequestPending;
        RequestedCounterparty = newCounterparty;
        RequestedCount = newCount;
        UTime = now;

        return true;
    }

    functionAcceptTransfer() public returns(bool success)
    {
        if (currState != StateType.TransitionRequestPending)
        {
            revert();
        }
        currState = StateType.InTransit;
        UTime = now;

        return true;
    }

    functionComplete() public returns(bool success)
    {
        if (currState != StateType.InTransit)
        {
            revert();
        }
        currState = StateType.Completed;
        if (FirstCount != RequestedCount) {
            currState = StateType.OutOfCompliance;
        }
        UTime = now;

        return true;
    }
}
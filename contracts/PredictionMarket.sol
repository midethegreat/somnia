// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract PredictionMarket is Ownable, ReentrancyGuard {
    struct Market {
        uint256 id;
        string title;
        string category;
        uint256 yesPool;
        uint256 noPool;
        uint256 createdAt;
        uint256 resolvedAt;
        bool resolved;
        bool outcome; // true = YES wins, false = NO wins
        address oracle;
    }

    struct Bet {
        uint256 id;
        uint256 marketId;
        address bettor;
        bool position; // true = YES, false = NO
        uint256 amount;
        uint256 odds;
        uint256 timestamp;
        bool settled;
        uint256 payout;
    }

    mapping(uint256 => Market) public markets;
    mapping(uint256 => Bet) public bets;
    mapping(address => uint256[]) public userBets;
    
    uint256 public marketCount;
    uint256 public betCount;
    address public oracleAddress;

    event MarketCreated(uint256 indexed marketId, string title, address indexed creator);
    event BetPlaced(uint256 indexed betId, uint256 indexed marketId, address indexed bettor, bool position, uint256 amount);
    event MarketResolved(uint256 indexed marketId, bool outcome);
    event BetSettled(uint256 indexed betId, address indexed bettor, uint256 payout);

    constructor(address _oracle) {
        oracleAddress = _oracle;
    }

    function createMarket(string memory _title, string memory _category) external onlyOwner returns (uint256) {
        uint256 marketId = marketCount++;
        
        markets[marketId] = Market({
            id: marketId,
            title: _title,
            category: _category,
            yesPool: 0,
            noPool: 0,
            createdAt: block.timestamp,
            resolvedAt: 0,
            resolved: false,
            outcome: false,
            oracle: msg.sender
        });

        emit MarketCreated(marketId, _title, msg.sender);
        return marketId;
    }

    function placeBet(uint256 _marketId, bool _position, uint256 _amount) external nonReentrant {
        require(!markets[_marketId].resolved, "Market already resolved");
        require(_amount > 0, "Amount must be greater than 0");

        // Calculate odds based on pool
        uint256 odds = calculateOdds(_marketId, _position);
        
        uint256 betId = betCount++;
        bets[betId] = Bet({
            id: betId,
            marketId: _marketId,
            bettor: msg.sender,
            position: _position,
            amount: _amount,
            odds: odds,
            timestamp: block.timestamp,
            settled: false,
            payout: 0
        });

        // Update pools
        if (_position) {
            markets[_marketId].yesPool += _amount;
        } else {
            markets[_marketId].noPool += _amount;
        }

        userBets[msg.sender].push(betId);
        emit BetPlaced(betId, _marketId, msg.sender, _position, _amount);
    }

    function calculateOdds(uint256 _marketId, bool _position) public view returns (uint256) {
        Market memory market = markets[_marketId];
        uint256 totalPool = market.yesPool + market.noPool;
        
        if (totalPool == 0) return 100; // 1:1 odds initially
        
        if (_position) {
            // YES odds: total / yes
            return (totalPool * 100) / (market.yesPool + 1); // +1 to prevent division by 0
        } else {
            // NO odds: total / no
            return (totalPool * 100) / (market.noPool + 1);
        }
    }

    function resolveMarket(uint256 _marketId, bool _outcome) external {
        require(msg.sender == oracleAddress, "Only oracle can resolve");
        require(!markets[_marketId].resolved, "Market already resolved");

        markets[_marketId].resolved = true;
        markets[_marketId].outcome = _outcome;
        markets[_marketId].resolvedAt = block.timestamp;

        emit MarketResolved(_marketId, _outcome);
    }

    function settleBet(uint256 _betId) external nonReentrant {
        Bet storage bet = bets[_betId];
        Market memory market = markets[bet.marketId];

        require(market.resolved, "Market not resolved");
        require(!bet.settled, "Bet already settled");
        require(bet.bettor == msg.sender, "Not bet owner");

        bet.settled = true;

        if (bet.position == market.outcome) {
            // Winning bet - calculate payout
            uint256 winningPool = market.outcome ? market.yesPool : market.noPool;
            uint256 losingPool = market.outcome ? market.noPool : market.yesPool;
            
            uint256 payout = bet.amount + ((bet.amount * losingPool) / winningPool);
            bet.payout = payout;

            emit BetSettled(_betId, bet.bettor, payout);
        } else {
            // Losing bet
            bet.payout = 0;
            emit BetSettled(_betId, bet.bettor, 0);
        }
    }

    function getUserBets(address _user) external view returns (uint256[] memory) {
        return userBets[_user];
    }

    function getMarket(uint256 _marketId) external view returns (Market memory) {
        return markets[_marketId];
    }

    function getBet(uint256 _betId) external view returns (Bet memory) {
        return bets[_betId];
    }
}

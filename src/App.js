import React, { useState, useEffect } from 'react';
import './App.css'

const CardListing = () => {
  const [activeTab, setActiveTab] = useState('Your');
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const response = {
      data: [
        {
          name: 'Mixmax',
          budget_name: 'Software subscription',
          owner_id: 1,
          spent: {
            value: 100,
            currency: 'SGD',
          },
          available_to_spend: {
            value: 1000,
            currency: 'SGD',
          },
          card_type: 'burner',
          expiry: '9 Feb',
          limit: 100,
          status: 'active',
        },
        {
          name: 'Quickbooks',
          budget_name: 'Software subscription',
          owner_id: 2,
          spent: {
            value: 50,
            currency: 'SGD',
          },
          available_to_spend: {
            value: 250,
            currency: 'SGD',
          },
          card_type: 'subscription',
          limit: 10,
          status: 'active',
        },
      ],
      page: 1,
      per_page: 10,
      total: 100,
    };
    setCards(response.data);
    setIsLoading(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // eslint-disable-next-line array-callback-return
    const filteredCards = cards.filter((card)=>{
      if (tab === 'Your') {
        return card.owner_id === 1;
      } else if (tab === 'all') {
        return true;
      } else if (tab === 'blocked') {
        return card.status === 'blocked';
      }
    });
    setCards(filteredCards);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const filterCards = () => {
  
    let filteredCards = cards;
    if (searchQuery) {
      filteredCards = filteredCards.filter((card) =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterValue !== 'all') {
      filteredCards = filteredCards.filter(
        (card) => card.card_type === filterValue
      );
    }
    return filteredCards;
  };

  const loadMoreData = () => {
   
    setPage(page + 1);
    fetchData();
  };

  return (
    <div className='container'>
      <header>Searching Data</header>
      <div>
        <button
          onClick={() => handleTabClick('Your')}
          className={activeTab === 'Your' ? 'active' : ''}
        >
          Your
        </button>
        <button
          onClick={() => handleTabClick('all')}
          className={activeTab === 'all' ? 'active' : ''}
        >
          All
        </button>
        <button
          onClick={() => handleTabClick('blocked')}
          className={activeTab === 'blocked' ? 'active' : ''}
        >
          Blocked
        </button>
      </div>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by card name"
        />
        <select value={filterValue} onChange={handleFilterChange}>
          
          <option value="all">All</option>
          <option value="burner">Burner</option>
          <option value="subscription">Subscription</option>
        </select>
      </div>
      <div className='middle'>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          filterCards().map((card, index) => (
            <div key={index} className="card">
              **********************<div className="card-type">card_type: {card.card_type}</div>
              <div className="card-details">
                <p> NAME : {card.name}</p>
                {card.card_type === 'burner' ? (
                  <p>Expiry: {card.expiry}</p>
                ) : (
                  <p>Limit: {card.limit}</p>
                )}
                <p>Status: {card.status}</p>
              </div>
            </div>
          ))
        )}
        <button onClick={loadMoreData} className='btn'>Load More</button>
      </div>
    </div>
  );
};

export default CardListing;


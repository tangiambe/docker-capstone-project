import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5001/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the items!', error);
        setError('Failed to fetch items');
      });
  }, []);

  const addItem = () => {
    axios.post('http://localhost:5001/items', { name: itemName })
      .then(response => {
        setItems([...items, response.data]);
        setItemName('');
      })
      .catch(error => {
        console.error('There was an error adding the item!', error);
        setError('Failed to add item');
      });
  };

  const deleteItem = (id) => {
    axios.delete(`http://localhost:5001/items/${id}`)
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the item!', error);
        setError('Failed to delete item');
      });
  };

  return (
    <div className="container">
      <h1>Shopping List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="input-group">
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

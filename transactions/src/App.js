import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerTable from './components/CustomerTable';
import TransactionGraph from './components/TransactionGraph';
import './App.css';

function App() {
    const [data, setData] = useState({ customers: [], transactions: [] });
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        axios.get('/data.json')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="App">
            <CustomerTable
                customers={data.customers}
                transactions={data.transactions}
                setSelectedCustomer={setSelectedCustomer}
            />
            {selectedCustomer && (
                <TransactionGraph
                    customer={selectedCustomer}
                    transactions={data.transactions.filter(
                        t => t.customer_id === selectedCustomer.id
                    )}
                />
            )}
        </div>
        );
}

export default App;

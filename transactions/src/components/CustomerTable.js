import React, { useState } from 'react';
import './CustomerTable.css';

function CustomerTable({ customers, transactions, setSelectedCustomer }) {
    const [nameFilter, setNameFilter] = useState('');
    const [amountFilter, setAmountFilter] = useState('');

    const filteredCustomers = customers.filter(customer => {
        const totalAmount = transactions
            .filter(t => t.customer_id === customer.id)
            .reduce((sum, t) => sum + t.amount, 0);

        return (
            customer.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
            (amountFilter === '' || totalAmount >= parseInt(amountFilter))
        );
    });

    return (
        <div>
            <h2>Customer Transactions</h2>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Filter by name"
                    value={nameFilter}
                    onChange={e => setNameFilter(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Filter by transaction amount"
                    value={amountFilter}
                    onChange={e => setAmountFilter(e.target.value)}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Total Transaction Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map(customer => {
                        const totalAmount = transactions
                            .filter(t => t.customer_id === customer.id)
                            .reduce((sum, t) => sum + t.amount, 0);

                        return (
                            <tr
                                key={customer.id}
                                onClick={() => setSelectedCustomer(customer)}
                            >
                                <td>{customer.name}</td>
                                <td>{totalAmount}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerTable;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Tooltip,
    Legend
);

const getRandomColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.2)`;
};

const Dashboard = () => {
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [newItemCost, setNewItemCost] = useState('');
    const [editingIndex, setEditingIndex] = useState(-1);
    const [showCharts, setShowCharts] = useState(false);
    const [total, setTotal] = useState(0);

    const updateTotal = (items) => {
        const totalCost = items.reduce((acc, item) => acc + item.cost, 0);
        setTotal(totalCost);
    };

    const handleAddOrUpdateItem = (e) => {
        e.preventDefault();
        const updatedItems = [...items];
        if (editingIndex >= 0) {
            updatedItems[editingIndex] = { name: newItemName, cost: parseFloat(newItemCost) };
        } else {
            updatedItems.push({ name: newItemName, cost: parseFloat(newItemCost) });
        }
        setItems(updatedItems);
        updateTotal(updatedItems);
        setNewItemName('');
        setNewItemCost('');
        setEditingIndex(-1);
    };

    const handleEdit = (index) => {
        setNewItemName(items[index].name);
        setNewItemCost(items[index].cost.toString());
        setEditingIndex(index);
    };

    const chartData = {
        labels: items.map(item => item.name),
        datasets: [{
            label: 'Cost of Items',
            data: items.map(item => item.cost),
            backgroundColor: items.map(() => getRandomColor()),
            borderColor: items.map(() => getRandomColor()),
            borderWidth: 1
        }]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        maintainAspectRatio: false,
        responsive: true
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard Page</h1>
            <form onSubmit={handleAddOrUpdateItem}>
                <input type="text" placeholder="Item Name" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} />
                <input type="number" placeholder="Item Cost" value={newItemCost} onChange={(e) => setNewItemCost(e.target.value)} />
                <button type="submit">{editingIndex >= 0 ? 'Update Item' : 'Add Item'}</button>
            </form>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item.name}: ${item.cost.toFixed(2)}
                        <button onClick={() => handleEdit(index)}>Edit</button>
                    </li>
                ))}
            </ul>
            <h2>Total Budget: ${total.toFixed(2)}</h2>
            <button onClick={() => setShowCharts(!showCharts)}>Show/Hide Visualizations</button>
            {showCharts && (
                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    <div style={{ width: '300px', height: '300px' }}>
                        <Bar data={chartData} options={options} />
                    </div>
                    <div style={{ width: '300px', height: '300px' }}>
                        <Pie data={chartData} options={options} />
                    </div>
                    <div style={{ width: '300px', height: '300px' }}>
                        <Line data={chartData} options={options} />
                    </div>
                </div>
                
            )}
            <div>
                <Link to="/">Logout</Link>
            </div>
        </div>
    );
};

export default Dashboard;


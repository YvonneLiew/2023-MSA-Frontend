import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getExpensesPerCategory } from '../services/statistics';
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    Tooltip, Legend, ArcElement
);

const StatisticsPage = () => {
    const dispatch = useDispatch();
    const expenseAmountPerCategory = useSelector(state =>
        state.statisticsSlice.expenseAmountPerCategory);
    const [doughnut, setDoughnut] = useState({
        labels: [],
        data: [],
    });

    useEffect(() => {
        getExpensesPerCategory(dispatch);
    }, []);

    useEffect(() => {
        setDoughnut({
            labels: expenseAmountPerCategory.map(x => x.key),
            data: expenseAmountPerCategory.map(x => x.value),
        })
    }, [expenseAmountPerCategory]);

    const data = {
        labels: doughnut.labels,
        datasets: [{
            data: doughnut.data,
            backgroundColor: [
            '#AAE8F7',
            '#F7AAC5',
            '#F5D684',
            '#A6F7C7',
            '#CBA6F7',
            '#F7B8A6',
            '#F7D2A6'
            ]
        }],
    };

    return <div hidden={!expenseAmountPerCategory || !expenseAmountPerCategory.length}
    style={{maxWidth: '35rem', maxHeight: '35rem', margin: 'auto', textAlign: 'center', paddingBottom: '20px'}}>
        <h4 style={{marginTop: '10px'}}>Expenses per Category</h4>
        <Doughnut data = {data} />
    </div>;
};

export default StatisticsPage;

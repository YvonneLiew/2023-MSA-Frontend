
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getExpensesPerCategory } from '../services/statistics';
import { useEffect, useState } from 'react';

const StatisticsPage = () => {
    const dispatch = useDispatch();
    const expenseAmountPerCategory = useSelector(state =>
        state.statisticsSlice.expenseAmountPerCategory);
    const [doughnut, setDoughnut] = useState({
        labels: [],
        data: [],
    });

    useEffect(() => {
        setDoughnut({
            labels: expenseAmountPerCategory.map(x => x.Key),
            data: expenseAmountPerCategory.map(x => x.Value),
        })
    }, [expenseAmountPerCategory]);

    useEffect(() => {
        getExpensesPerCategory(dispatch);
    }, []);

    const data = {
        labels: doughnut.labels,
        datasets: [{
            data: doughnut.data,
            backgroundColor: [
            '#007bff',
            '#FF0000',
            '#FFD700',
            '28a745',
            '#00FFFF',
            '#d69ae5',
            ]
        }],
        title: {
            text: 'Expenses per Category',
            display: true,
        },
    };

    return <div hidden={!expenseAmountPerCategory || !expenseAmountPerCategory.length}
    style={{maxWidth: '35rem', maxHeight: '35rem', margin: 'auto', textAlign: 'center'}}>
        <h4 style={{marginTop: '10px'}}>Expenses per Category</h4>
        <Doughnut data={data} />
    </div>;
};

export default StatisticsPage;

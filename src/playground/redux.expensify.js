import { createStore, combineReducers } from 'redux';
import React from 'react';
import {v1 as uuid} from 'uuid';

export default function Redux2() {


    const expensesReducerDefaultState=[]
    const expensReducer = (state = expensesReducerDefaultState, action) => {
        // console.log('action is ', action);
        // console.log('state is', state);
        

        switch (action.type) {
            case 'ADD_EXPENSE':
                return [...state, action.expense]
            case 'REMOVE_EXPENSE':
                return state.filter(({ id }) => id !== action.id)
            case 'EDIT_EXPENSE':
                return state.map((expense) => (
                    expense.id === action.id ? { ...expense, ...action.updates } :  expense
                    // if (expense.id === action.id) {
                    //     return {
                    //         ...expense,
                    //         ...action.updates
                    //     }
                    // } else {
                    //     return expense
                    // }
                ))
            default:
                return state;
        }
    };

    const filterReducerDefaultState = {
        text : '',
        sortBy: 'date',
        startDate : undefined,
        endDate : undefined
    }
    const filterReducer = (state = filterReducerDefaultState, action) => {
        // console.log('in filter',{action})
        switch (action.type) {
            case 'SET_TEXT_FILTER': 
                return {
                    ...state,
                    text : action.text
                }
            case 'SORT_BY_AMOUNT':
                return {
                    ...state,
                    sortBy : 'amount'
                }
            case 'SORT_BY_DATE':
                return {
                    ...state,
                    sortBy : 'date'
                }
            case 'SET_START_DATE':
                return {
                    ...state,
                    startDate : action.startDate
                }
            case 'SET_END_DATE':
                return {
                    ...state,
                    endDate : action.endDate
                }
            default:
                return state;
        }
    };

    const store = createStore(combineReducers(
        {
            expenses: expensReducer,
            filters:filterReducer
        }
    ));

    const addExpense = ({description = '',note = '',amount = 0,createdAt = 0} = {}) => ({
        type: 'ADD_EXPENSE',
        expense : {
                id: uuid(),
                description,
                note,
                amount,
                createdAt  
        }
    })
        
    const removeExpense = ({ id } = {}) => ({
        type: 'REMOVE_EXPENSE',
        id
    });

    
    
    const editExpense = (id,updates) => (
        {
            type: 'EDIT_EXPENSE',
            id, 
            updates
        }
    )
 

    const setTextFilter = (text = '') => ({
        type: 'SET_TEXT_FILTER',
        text
   })

    
    const sortByAmount = () => ({
        type : 'SORT_BY_AMOUNT'
    }
    );
    const sortByDate = () => ({
        type : 'SORT_BY_DATE'
        
    }
    );

    const setStartDate = (startDate) => ({
        type: 'SET_START_DATE',
        startDate
    });
    const setEndDate = (endDate) => ({
        type: 'SET_END_DATE',
        endDate
    })
    

    const getVisibleExpense = (expenses, { text, sortBy, startDate, endDate }) => {
        
        return expenses.filter((expense) => {
            const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
            const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
            const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
            return startDateMatch && endDateMatch && textMatch
        }).sort((a, b) => {
            if (sortBy === 'date') {
                return a.createdAt < b.createdAt ? 1 : -1;
            } else if (sortBy === 'amount') {
                return a.amount < b.amount ? 1 : -1;
            }

        });
    };

    const sunscripe = store.subscribe(() => {
        const state = store.getState();
        const visibleExpenses = getVisibleExpense(state.expenses,state.filters)
        // console.log(store.getState());
        console.log(visibleExpenses);
        

    });
    

//------------------------dispathes---------------------------

    const expenseOne=store.dispatch(addExpense({  
        description: 'Rent',
        amount: 10,
        createdAt: 1000
    }));

    const expenseTwo=store.dispatch(addExpense({
        description: 'Coffee',
        amount: 300,
        createdAt:-1000  //in milisecond
    }));


    // const deleteExpenseOne = store.dispatch(removeExpense({
    //     id: expenseOne.expense.id
    // }));

    // const editExpenseTwo= store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

    // store.dispatch(setTextFilter('rent')); //filter by text
    store.dispatch(sortByAmount()); // sort by amount
    // store.dispatch(sortByDate());


    // store.dispatch(setStartDate(125));
    // store.dispatch(setEndDate(1250));





//---------------------dispatches---------------------------
    return (
        <div>
            
        </div>
    )
}

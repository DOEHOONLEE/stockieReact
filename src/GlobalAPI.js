import React, {
    useRef,
    createContext,
    useReducer,
    useContext,
    useEffect,
} from 'react'
require('dotenv').config()

const initialState = {
    stockList: JSON.parse(localStorage.getItem('stockData')) || [],
    defaultIndex: [
        {
            id: 'KOSPI',
            name: '코 스 피',
            code: '^KS11',
            country: 'KR',
            price: 0,
            diff: '',
        },
        {
            id: 'KOSDAQ',
            name: '코 스 닥',
            code: '^KQ11',
            country: 'KR',
            price: 0,
            diff: '',
        },
        {
            id: 'DOW',
            name: '다 우',
            code: '^DJI',
            country: 'US',
            price: 0,
            diff: '',
        },
        {
            id: 'NASDAQ',
            name: '나 스 닥',
            code: '^IXIC',
            country: 'US',
            price: 0,
            diff: '',
        },
    ],
}

function stockReducer(state, action) {
    switch (action.type) {
        case 'ADD_STOCK':
            return {
                ...state,
                stockList: state.stockList.concat(action.newStock),
            }
        case 'REFRESH_STOCK':
            return {
                ...state,
                stockList: state.stockList.map(eachStock => {
                    const stockUpdate = {
                        id: eachStock.id,
                        code: eachStock.code,
                        title: '',
                        country: eachStock.country,
                        price: '',
                        diff: '',
                    }

                    const getStockInfo = async () => {
                        const stocks = await fetchStocks(
                            eachStock.code,
                            eachStock.country
                        )
                        stockUpdate.title = await stocks[1]
                        stockUpdate.price = await stocks[3]
                        stockUpdate.diff = await stocks[4]
                    }
                    getStockInfo()
                    return stockUpdate
                }),
                defaultIndex: state.defaultIndex.map(eachIdx => {
                    const indexUpdate = {
                        id: eachIdx.id,
                        code: eachIdx.code,
                        country: eachIdx.country,
                        price: 0,
                        diff: '',
                    }

                    const getIndexInfo = async () => {
                        const indexes = await fetchStocks(
                            eachIdx.code,
                            eachIdx.country
                        )

                        indexUpdate.price = await indexes[3]
                        indexUpdate.diff = await indexes[4]
                    }
                    getIndexInfo()
                    return indexUpdate
                }),
            }
        case 'REMOVE_STOCK':
            return {
                ...state,
                stockList: state.stockList.filter(
                    eachStock => eachStock.id !== action.id
                ),
            }
    }
}

// Fetch Stocks
const fetchStocks = async (code, country) => {
    const targetURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?symbols=${code}&region=${country}`
    const response = await fetch(targetURL, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
            'x-rapidapi-key': process.env.API_KEY,
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json()

    let title =
        data.quoteResponse.result[0].longName ||
        data.quoteResponse.result[0].symbol
    title =
        title.length > 13
            ? title
                  .split(' ')
                  .map(c => c[0])
                  .join('')
                  .slice(0, 3)
            : title
    const price = data.quoteResponse.result[0].regularMarketPrice
    const diff = `${data.quoteResponse.result[0].regularMarketChange.toFixed(
        2
    )} (${data.quoteResponse.result[0].regularMarketChangePercent.toFixed(2)}%)`

    return [code, title, country, price, diff]
}

const StockContext = createContext()
const StockDispatch = createContext()
const StockContextID = createContext()

export const GlobalContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(stockReducer, initialState)
    const nextID = useRef(0)

    useEffect(() => {
        localStorage.setItem('stockData', JSON.stringify(state.stockList))
        console.log(state.stockList)
        console.log(state.defaultIndex)
        console.log(localStorage)
    })

    return (
        <StockContext.Provider value={state}>
            <StockDispatch.Provider value={dispatch}>
                <StockContextID.Provider value={nextID}>
                    {children}
                </StockContextID.Provider>
            </StockDispatch.Provider>
        </StockContext.Provider>
    )
}

export function useStockState() {
    return useContext(StockContext)
}

export function useStockDispatch() {
    return useContext(StockDispatch)
}

export function useStockID() {
    return useContext(StockContextID)
}

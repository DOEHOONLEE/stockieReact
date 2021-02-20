import React from 'react'
import styled from 'styled-components'
import StockItem from './StockItem'
import { useStockState } from '../GlobalAPI'

const ItemListContainer = styled.div`
    padding: 5px;
    border-top: 3px solid #5b43ec;
`

function StockList() {
    const stocks = useStockState().stockList

    return (
        <ItemListContainer>
            {stocks.map((eachStock) => (
                <StockItem
                    key={eachStock.id}
                    id={eachStock.id}
                    title={eachStock.title}
                    price={eachStock.price}
                    diff={eachStock.diff}
                />
            ))}
        </ItemListContainer>
    )
}

export default StockList

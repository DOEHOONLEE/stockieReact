import React from 'react'
import styled from 'styled-components'
import StockHeader from './StockHeader'
import StockIndex from './StockIndex'
import StockList from './StockList'

const StockContainerTemplate = styled.div`
    width: 360px;
    height: 750px;
    margin: 0 auto;
    margin-top: 10px;
    background-color: #fff;

    border: 1px solid grey;
    border-radius: 5px;
`

function StockContainer() {
    return (
        <StockContainerTemplate>
            <StockHeader />
            <StockIndex />
            <StockList />
        </StockContainerTemplate>
    )
}

export default StockContainer

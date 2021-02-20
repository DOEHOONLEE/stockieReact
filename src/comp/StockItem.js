import React from 'react'
import styled from 'styled-components'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useStockDispatch } from '../GlobalAPI'

const StockItemBlock = styled.div`
    height: 45px;
    line-height: 45px;
    font-size: 15px;
    font-weight: 600;
    margin: 5px;
    padding: 0px 8px;

    border-radius: 8px;

    display: flex;
    justify-content: space-between;

    background-color: ${props =>
        props.change === 'increase' ? '#ffb3d1' : '#8cb5ed'};
`

function StockItem({ id, title, price, diff }) {
    const dispatch = useStockDispatch()
    const onRemove = () => dispatch({ type: 'REMOVE_STOCK', id })

    return (
        <StockItemBlock change={diff[0] === '-' ? 'decrease' : 'increase'}>
            <span>{title}</span>
            <span>{price}</span>
            <span>{diff}</span>
            <span onClick={onRemove}>
                <RiDeleteBinLine />
            </span>
        </StockItemBlock>
    )
}

export default StockItem

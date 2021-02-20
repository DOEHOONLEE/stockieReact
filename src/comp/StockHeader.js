import React, { useState } from 'react'
import styled from 'styled-components'
import { GrRefresh } from 'react-icons/gr'
import { useStockID, useStockDispatch, useStockState } from '../GlobalAPI'

const StockHeaderTemplate = styled.div`
    height: 40px;

    display: flex;
    justify-content: space-between;

    padding: 0px 15px;

    border-bottom: 3px solid #5b43ec;
`

const StockHeaderLogo = styled.span`
    font-size: 15px;
    font-weight: 700;
    color: #5b43ec;

    line-height: 40px;
`

const StockHeaderSearch = styled.input`
    border: none;
    border-bottom: 2px solid grey;
    outline: none;

    height: 34px;
    width: 197px;
`

const StockHeaderRefresh = styled.span`
    height: 30px;
    width: 30px;

    margin-top: 5px;

    border-radius: 50%;
    background-color: #6754db;

    line-height: 40px;
    text-align: center;
`

function StockHeader() {
    const [input, setInput] = useState('')

    const state = useStockState()
    const dispatch = useStockDispatch()
    const nextID = useStockID()

    const onChange = e => {
        setInput(e.target.value)
    }

    const countryCode = input.slice(0, 2)
    const stockCode = input.slice(3)

    const onSubmitStock = e => {
        e.preventDefault()

        dispatch({
            type: 'ADD_STOCK',
            newStock: {
                id: nextID.current,
                country: countryCode,
                code: stockCode,
                diff: 0,
            },
        })

        nextID.current++
        setInput('')
    }

    const onStockRefresh = () => {
        const stockCodePattern = new RegExp('^[A-Z]{2}[0-9]{6}[A-Z]{2}')
        if (stockCodePattern.test(input)) {
            dispatch({
                type: 'REFRESH_STOCK',
            })
        } else {
            alert('주식 코드를 정확히 입력해주세요.')
            alert('나라코드.주식코드 => 예시: KR.035720.KS')
        }
    }

    return (
        <StockHeaderTemplate>
            <StockHeaderLogo>STOCKIE</StockHeaderLogo>
            <form onSubmit={onSubmitStock}>
                <StockHeaderSearch
                    onChange={onChange}
                    value={input}
                    placeholder="코드를 입력해주세요 (예: KR.035720.KS)"
                ></StockHeaderSearch>
            </form>
            <StockHeaderRefresh onClick={onStockRefresh}>
                <GrRefresh />
            </StockHeaderRefresh>
        </StockHeaderTemplate>
    )
}

export default StockHeader

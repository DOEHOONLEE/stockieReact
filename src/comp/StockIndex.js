import React from 'react'
import styled from 'styled-components'
import { useStockState } from '../GlobalAPI'

const StockIndexContainer = styled.div`
    display: flex;
    justify-content: space-around;

    padding: 0px 10px;
    margin-top: 10px;

    text-align: center;
`

const StockIndexBlock = styled.div`
    width: 150px;
    height: 95px;
    /* background-color: hotpink; */
    padding: 5px 0px;
`

const IndexValue = styled.div`
    font-size: 30px;
    color: ${(props) => (props.change === 'increase' ? 'hotpink' : '#257DF5')};
`
const IndexPercent = styled.div`
    font-weight: 300;
    color: ${(props) => (props.change === 'increase' ? 'hotpink' : '#257DF5')};
`

function StockContainer() {
    const indexes = useStockState().defaultIndex

    return (
        <>
            <StockIndexContainer>
                <StockIndexBlock>
                    <div>코 스 피</div>
                    <IndexValue
                        change={
                            indexes[0].diff[0] === '-' ? 'decrease' : 'increase'
                        }
                    >
                        {indexes[0].price}
                    </IndexValue>
                    <IndexPercent
                        change={
                            indexes[0].diff[0] === '-' ? 'decrease' : 'increase'
                        }
                    >
                        {indexes[0].diff}
                    </IndexPercent>
                </StockIndexBlock>
                <StockIndexBlock>
                    <div>코 스 닥</div>
                    <IndexValue
                        change={
                            indexes[1].diff[0] === '-' ? 'decrease' : 'increase'
                        }
                    >
                        {indexes[1].price}
                    </IndexValue>
                    <IndexPercent
                        change={
                            indexes[1].diff[0] === '-' ? 'decrease' : 'increase'
                        }
                    >
                        {indexes[1].diff}
                    </IndexPercent>
                </StockIndexBlock>
            </StockIndexContainer>
            <StockIndexContainer>
                <StockIndexBlock>
                    <div>다 우</div>
                    <IndexValue
                        change={
                            indexes[2].diff[0] === '-' ? 'decrease' : 'increase'
                        }
                    >
                        {indexes[2].price}
                    </IndexValue>
                    <IndexPercent
                        change={
                            indexes[2].diff[0] === '-' ? 'decrease' : 'increase'
                        }
                    >
                        {indexes[2].diff}
                    </IndexPercent>
                </StockIndexBlock>
                <StockIndexBlock>
                    <div>나 스 닥</div>
                    <IndexValue
                        change={
                            indexes[3].diff[0] === '-' ? 'decrease' : 'increase'
                        }
                    >
                        {indexes[3].price}
                    </IndexValue>
                    <IndexPercent
                        change={
                            indexes[3].diff[0] === '-' ? 'decrease' : 'increase'
                        }
                    >
                        {indexes[3].diff}
                    </IndexPercent>
                </StockIndexBlock>
            </StockIndexContainer>
        </>
    )
}

export default StockContainer

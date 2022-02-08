import styled from "@emotion/styled";

export const Table = styled.table`
    display: table;
    width:100%;
    border:0;
    cellspacing:1;
    background-color:#d7d7d7;
    border-collapse: separate;
    box-sizing: border-box;
    text-indent: initial;
    border-spacing: 2px;
    border-color: grey;
`

export const Title = styled.td`
    height: 30px;
    text-align: right;
    padding-right: 10px;
    & > span {
        font-size: 11px;
        background-color: #f4f4f4;
    }
    & > div {
        padding-left: 10px;
        background-color: #ffffff;
        & > input {
            padding: 2px 5px 2px 5px;
            height: 18px;
            border: 1px solid #bbbbbb;
            vertical-align: middle;
        }
    }
`

export const Content = styled.tr`
    background-color: #ffffff;
    padding: 10px;
`

export const Submitdiv = styled.div`
    padding: 10px 0 10px 0; 
    & > table {
        width: 98%;
        height: 40px;
        display: table-row-group;
        vertical-align: middle;
        text-align: -webkit-center;
        & > input {
            display: inline-block;
            background: #5987CD;
            border: 1px solid #3366CC;
            padding: 5px 15px 5px 15px;
            cursor: pointer;
            color: #fff;
            font-weight: bold;
            font-size: 12px;
            line-height: 12px;
            border-radius: 3px;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
        }
    }
`
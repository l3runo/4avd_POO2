import styled from 'styled-components';
import { shade } from 'polished';



export const Container = styled.div`
    width: 100%;
    max-width: 1180px;
    padding: 0 30px;
    margin: 32px auto;

    header{
        display: flex;
        align-items: center;
        color: #7F25FC;
    }

    header img{
        height: 120px;
    }
    span{
        font-size: 20px;
        margin-left: 24px;
    }
    header a{
        text-decoration: none;
        text-align: center;
        font-weight: bold;
        font-family: Arial;

        display: block;
        height: 40px;
        line-height: 40px;
        padding: 10px 5px;
    
        width: 260px;
        margin-left: auto;
        margin-top: 0;
        height: 60px;
        background: #7a499c;
        border-radius: 10px;
        color: black;

        &: hover {
            background: ${shade(0.2, '#5d3778')};  
        }
    }
    header button {
        height: 60px;
        width: 60px;
        border-radius: 4px;
        border: 1px solid #dcdce6;
        background: transparent;
        margin-left: 16px;
        transition: border-color 0.2s;
        background: #7F25FC;
    }
    header button:hover{
        border-color: #999 ;
    }

    form{
        margin: 80px auto;
        padding: 60px;
        max-width: 730px;
        background: #FFF;
        border-radius: 8px;
        color: black;
        display: flex;
        flex-direction: column;
    }

    form fieldset{
        margin-top: 5px;
        min-inline-size: auto;
        border: 0;
    }

    form legend{
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    form legend h2{
        font-size: 24px;
    }
    
    form div{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    form select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: #232129;
        border-radius: 7px;
        border: 0;
        padding: 16px 24px;
        font-size: 16px;
        color: #6C6C80;
        width: 100%;
        margin-bottom: 10px;
        margin-top: 10px;   
    }
`;

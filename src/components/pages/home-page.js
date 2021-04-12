import React, {useState} from "react";
import styled from "styled-components"
import {Link} from "react-router-dom";


const HomePage = () => {
    const numPad = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const [accountNumber, setAccountNumber] = useState("");

    const updateValueHandler = (value) => {
        const newValue = accountNumber + value;
        setAccountNumber(newValue);
    };

    const onBackHandler = (value) => {
        const newValue = value.slice(0, -1);
        setAccountNumber(newValue);
    };

    return (
        <HomePageContainer>
            <LogInContainer className="login">
                <h4>Welcome to CashCo</h4>
                Please enter your account#
                <br/>
                <KeyPadContainer>
                    <input placeholder="..." value={accountNumber} type="number"
                           onChange={(e) => setAccountNumber(e.target.value)}/>
                    {numPad.map(el => (
                        <button key={el} value={el} onClick={() => updateValueHandler(el)}>{el}</button>
                    ))}
                    <button onClick={() => setAccountNumber("")}>Clear</button>
                    <button value="0" onClick={(e) => updateValueHandler(e.target.value)}>0</button>
                    <button onClick={() => onBackHandler(accountNumber)}>
                        <i className="fa fa-backward" aria-hidden="true"/>
                    </button>
                </KeyPadContainer>
                <Link to={`/accountInfo/${accountNumber}`} className="btnLink" >
                    <button type="button" className="btn btn-primary btn-lg">OK</button>
                </Link>
            </LogInContainer>
        </HomePageContainer>
    );
};


export default HomePage;

const HomePageContainer = styled.div`
  display: flex;
  height: 400px;
  //align-items: center;
  justify-content: center;
  padding-bottom: 20px;
`;

const LogInContainer = styled.div`
   flex: 0.4;
   display: flex;
   height: 100%;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   
   > .btnLink  {
   margin-top: 15px;
   }

`;

const KeyPadContainer = styled.div`
  align-content: center;
  //flex:0.5;
  
  > input {
  width: 100%;
  margin-bottom: 3px;
  }

  > button {
    width: 33.3%;
  }
`;
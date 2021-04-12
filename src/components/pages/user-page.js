import React, {useEffect, useState} from "react";
import {getUserByAccountId, userUpdateSelf} from "../../redux/actions";
import {connect} from "react-redux";
import styled from "styled-components";
import {Modal, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import moment from "moment";

const UserPage = (props) => {
    const accountNumber = props.match.params.accountNumber;
    const {userInfo, getUser, userUpdateSelf} = props;
    const [show, setShow] = useState(false);
    const [isBtnDisable, setIsBtnDisable] = useState(false);
    const [inputValue, seInputValue] = useState("");
    const [userAction, setUserAction] = useState("");
    const [userBalance, setUserBalance] = useState(userInfo.balance);
    const date = moment(new Date()).format('MMMM_Do_YYYY,h:mm_a');
    const isAdmin = userInfo.role === "admin";


    const handleClose = () => {
        setUserBalance(userInfo.balance);
        setIsBtnDisable(false);
        setShow(false);
    };


    let newBalance;
    const handleShow = (action) => {
        if (action === "deposit") newBalance = Number(userInfo.balance) + Number(inputValue);
        if (action === "withdraw") newBalance = Number(userInfo.balance) - Number(inputValue);
        if (newBalance < 0) setIsBtnDisable(true);
        setUserBalance(newBalance);
        setUserAction(action);
        setShow(true);
    };

    const receipt = {
        name: userInfo.name,
        date,
        'balance': userInfo.balance + "$",
        'transaction type': userAction,
        amount: inputValue + "$",
        'remaining balance': userBalance + "$"
    };


    const downloadData = (receipt) => {
        const jasonReceipt = JSON.stringify(receipt, null, 2);
        const blob = new Blob([jasonReceipt], {type: 'text/jason'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("hidden", "");
        a.setAttribute("href", url);
        a.setAttribute("download", `receipt${userInfo.name}${date}.json`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleConfirm = () => {
        userUpdateSelf(accountNumber, userBalance);
        downloadData(receipt);
        seInputValue("");
        setShow(false);
    };

    useEffect(() => {
        getUser(accountNumber);
    }, [accountNumber, getUser]);

    return (
        <UserPageContainer>
            <AdminContainer>
                {isAdmin ? (
                    <Link to={`/admin/${accountNumber}`}>
                        <Button variant="primary">Users</Button>

                    </Link>
                ) : null}
            </AdminContainer>
            <UserInfoContainer>
                <h4>Welcome Back, {userInfo.name}</h4>

                <span>Your balance:{userInfo.balance}$</span>
            </UserInfoContainer>
            <input placeholder={`Available balance to withdraw:${userInfo.balance}$`}
                   type="number"
                   value={inputValue}
                   onChange={(e) => seInputValue(e.target.value)}
            />
            <div className="button-group">
                <button type="button" className="btn btn-danger"
                        onClick={() => seInputValue("")}>Clear
                </button>
                <button type="button" className="btn btn-success"
                        onClick={() => handleShow("deposit")}>Deposit
                </button>
                <button type="button" className="btn btn-warning"
                        onClick={() => handleShow("withdraw")}>Withdraw
                </button>
            </div>

            <Modal show={show} onHide={handleClose} size="md">

                <Modal.Header closeButton>
                    <Modal.Title>Please confirm your transaction!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    You would like
                    to {userAction === "deposit" ? `${userAction} ${inputValue}$ to ` : `${userAction} ${inputValue}$ from `}
                    your account?
                    <br/>
                    Your remaining balance after this transaction: {userBalance}
                    <br/>
                    Press OK to confirm!
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" disabled={isBtnDisable} onClick={handleConfirm}>OK</Button>
                    <Button variant="primary" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </UserPageContainer>
    )
};

const mapStateToProps = (state) => ({
    userInfo: state.userInfo
});

const mapDispatchToProps = (dispatch) => ({
    getUser: (accountNumber) => dispatch(getUserByAccountId(accountNumber)),
    userUpdateSelf: (accountNumber, newBalance) => dispatch(userUpdateSelf(accountNumber, newBalance))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);


const UserPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 500px;
`;

const UserInfoContainer = styled.div`
  align-self: center;
  justify-self: center;
`;

const AdminContainer = styled.div`
  align-self: flex-end;
  //justify-self: center;
`;
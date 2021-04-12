import React, {useEffect, useState} from "react";
import {getUserByAccountId, usersSearch, userCreate, userDelete, userUpdate} from "../../redux/actions";
import {connect} from "react-redux";
import styled from "styled-components";
import {Modal, Button, FormControl, InputGroup} from "react-bootstrap";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import {Link} from "react-router-dom";


const AdminPage = (props) => {
    const accountNumber = props.match.params.accountNumber;
    const {usersSearch, getUser, clients, userCreate, userDelete, userUpdate} = props;
    const [show, setShow] = useState(false);
    const [searchName, setSearchName] = useState({name: ""});
    const [client, setClient] = useState({name: "", balance: 0, account: ""});
    const [adminAction, setAdminAction] = useState("");
    const handleClose = () => {
        setClient({name: "", balance: 0, account: ""});
        setShow(false);
    };
    const handleConfirm = (action) => {
        if (action === "create") userCreate(client);
        if (action === "delete") userDelete(client.account);
        if (action === "update") userUpdate(client);
        setClient({name: "", balance: 0, account: ""});
        setShow(false);
    };

    const handleModal = (action, client) => {
        setShow(true);
        setClient({name: client.name, balance: client.balance, account: client.account});
        setAdminAction(action);
    };

    const handleSearch = (input) => {
        let name = input;
        setSearchName({name});
        setTimeout(usersSearch({name}), 500);
    };

    useEffect(() => {
        getUser(accountNumber);
        usersSearch(searchName);
    }, []);

    return (
        <AdminContainer>
            <ListGroup>
                <ListGroupItem>
                    <InputGroup>
                        <FormControl
                            placeholder="Find by name"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>Search</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>

                    <Button variant="success" className="mt-1" onClick={() => handleModal('create', {})}>Create
                        Client</Button>
                </ListGroupItem>
                {clients.map((client) => (
                    <ListGroupItem key={client.account}>
                        <div>{client.name}</div>
                        <span>Balance:{client.balance}$</span>
                        <ButtonGroup className="control-btn">
                            <Button variant="primary" onClick={() => handleModal("update", client)}>Update</Button>
                            <Button variant="danger" onClick={() => handleModal("delete", client)}>Delete</Button>
                        </ButtonGroup>
                    </ListGroupItem>
                ))}
                <ListGroupItem>
                    <Link to={`/accountInfo/${accountNumber}`}>
                        <Button variant="primary">Home-Page</Button>
                    </Link>
                    <Link to={"/"}>
                        <Button variant="danger" className="ml-2">Log-Out</Button>
                    </Link>
                </ListGroupItem>
            </ListGroup>
            <Modal show={show} onHide={handleClose} size="md">

                <Modal.Header closeButton>
                    <Modal.Title>Please confirm your action!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    You would like to {adminAction} user?
                    <br/>
                    <span>Name:</span>
                    <FormControl value={client.name} onChange={(e) => setClient({...client, name: e.target.value})}/>
                    <br/>
                    <span>Balance in $</span>
                    <FormControl type="number" value={client.balance}
                                 onChange={(e) => setClient({...client, balance: e.target.value})}/>
                    <br/>
                    Press OK to confirm!
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" onClick={() => handleConfirm(adminAction)}>OK</Button>
                    <Button variant="primary" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </AdminContainer>
    )
};

const mapStateToProps = (state) => ({
    clients: state.clients,
    userInfo: state.userInfo
});

const mapDispatchToProps = (dispatch) => ({
    getUser: (accountNumber) => dispatch(getUserByAccountId(accountNumber)),
    usersSearch: (searchValues) => dispatch(usersSearch(searchValues)),
    userCreate: (payload) => dispatch(userCreate(payload)),
    userDelete: (payload) => dispatch(userDelete(payload)),
    userUpdate: (payload) => dispatch(userUpdate(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);


const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 400px;
  
`;

const ButtonGroup = styled.div`
  display: flex;
  align-self: end;
 
  > Button {
   margin: 0 2px;
  }
`;
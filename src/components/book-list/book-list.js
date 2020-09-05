import React, {Component} from "react";
import BookListItem from "../book-list-item";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {withBookstoreService} from "../hoc";
import {booksLoaded, booksRequested, booksError} from "../../actions";
import {compose} from "../../utils";
import "./book-list.css";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

class BookList extends Component {

    componentDidMount() {
        const {bookstoreService, booksLoaded, booksRequested, booksError} = this.props;
        booksRequested();
        bookstoreService.getBooks()
            .then((data) => booksLoaded(data))
            .catch((err) => booksError(err));
    }

    render() {
        const {books, loading, error} = this.props;

        if(loading){
            return <Spinner/>
        }

        if(error){
            return <ErrorIndicator/>
        }

        return (
            <ul className="book-list">
                {
                    books.map((book) => {
                        return (
                            <li key={book.id}><BookListItem book={book}/></li>
                        )
                    })
                }
            </ul>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        books: state.books,
        loading: state.loading,
        error: state.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        booksLoaded, booksRequested, booksError}, dispatch)
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList);

// export default withBookstoreService()(connect(mapStateToProps, mapDispatchToProps)(BookList));
import React, {Component} from "react";
import BookListItem from "../book-list-item";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withBookstoreService} from "../hoc";
import {fetchBooks, bookAddedToCart} from "../../actions";
import {compose} from "../../utils";
import "./book-list.css";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

const BookList = ({books, onAddedToCart}) => {
    return (
        <ul className="book-list">
            {
                books.map((book) => {
                    return (
                        <li key={book.id}>
                            <BookListItem
                                onAddedToCart={() => onAddedToCart(book.id)}
                                book={book}/>
                        </li>
                    )
                })
            }
        </ul>
    );
};

class BookListContainer extends Component {

    componentDidMount() {
        this.props.fetchBooks();
        // const {bookstoreService, booksLoaded, booksRequested, booksError} = this.props;
        // booksRequested();
        // bookstoreService.getBooks()
        //     .then((data) => booksLoaded(data))
        //     .catch((err) => booksError(err));
    }



    render() {
        const {books, loading, error, onAddedToCart} = this.props;

        if (loading) {
            return <Spinner/>
        }

        if (error) {
            return <ErrorIndicator/>
        }

        return <BookList
            onAddedToCart={onAddedToCart}
            books={books}/>
    };
}

const mapStateToProps = (state) => {
    return {
        books: state.bookList.books,
        loading: state.bookList.loading,
        error: state.bookList.error
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const {bookstoreService} = ownProps;
    // return {
    //     onAddedToCart: (id) => dispatch(bookAddedToCart(id)),
    //     fetchBooks: () => dispatch(fetchBooks(bookstoreService))
    // }

    return bindActionCreators({
        onAddedToCart: bookAddedToCart,
        fetchBooks: fetchBooks(bookstoreService)
    }, dispatch)
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);

// export default withBookstoreService()(connect(mapStateToProps, mapDispatchToProps)(BookListContainer));
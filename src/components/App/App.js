import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Navigate, Redirect, Route, Routes} from 'react-router-dom'
import Books from '../Books/BookList/books';
import Header from '../Header/header';
import Categories from '../Categories/categories';
import BookAdd from '../Books/BookAdd/bookAdd';
import BookEdit from "../Books/BookEdit/bookEdit";
import Authors from '../Authors/authors';
import LibraryService from "../../repository/libraryRepository";
class App extends Component{


  constructor(props) {
    super(props);
    this.state = {
        books: [],
        categories: [],
        authors : [],
        selectedBook : {}
    }
  }

  render() {
    return (
        <Router>
            <Header/>
            <main>
                <div className="container">
                    <Routes>
                        <Route path={"/books/add"} element={
                            <BookAdd authors={this.state.authors}
                                     categories={this.state.categories}
                                        onAddBook={this.addBook}/>}/>
                        <Route path={"/books/edit/:id"} element={
                            <BookEdit authors={this.state.authors}
                                      categories={this.state.categories}
                                     onEditBook={this.editBook}
                            book={this.state.selectedBook}/>}/>
                    <Route path={"/books"} element={<Books books={this.state.books} onDelete={this.deleteBook} onEdit={this.getBook} onTaken={this.takenBook}/>}/>
                    <Route path={"/categories"} element={ <Categories categories={this.state.categories}/>}/>
                        <Route path={"/authors"} element={ <Authors authors={this.state.authors}/>}/>
                        <Route path="/" element={<Navigate replace to="/books" />} />
                </Routes>
                </div>
            </main>
        </Router>
    );
  }


  componentDidMount() {
      this.loadBooks();
      this.loadCategories();
      this.loadAuthors();
  }
    loadBooks = () =>{
        LibraryService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            });
    }
    loadAuthors = () => {
        LibraryService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            });
    }
    loadCategories = () =>{
        LibraryService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            });
    }
    deleteBook = (id) => {
        LibraryService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            });
    }
    takenBook = (id) => {
        LibraryService.takenBook(id)
            .then(() => {
                this.loadBooks();
            });
    }
    addBook = (name, category, author, availableCopies) => {
        LibraryService.addBook(name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }
    getBook = (id) => {
        LibraryService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }
    editBook = (id, name, category, author, availableCopies) => {
        LibraryService.editBook(id, name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }
}

export default App;

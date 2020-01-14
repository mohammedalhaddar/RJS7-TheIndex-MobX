import axios from "axios";
import {observable, decorate, computed} from "mobx";

const instance = axios.create({
    baseURL: "https://the-index-api.herokuapp.com"
});

class BookStore{
    books = [];
    loading = true;
    query = ""

    fetchBooks = async () => {
        try {
          const res = await instance.get("/api/books/");
          const books = res.data;
          this.books = books;
          this.loading = false;
        } catch (err) {
          console.error(err);
        }
    };

    get filteredBooks(){
        return this.books.filter( (book) => {
            return book.title.toLowerCase()
            .includes(this.query.toLowerCase())
        } )
    }

    filterBooksByColor = (color) => {
        return this.books.filter( (book) => {
            return book.color == color;
        } )
    }
}


decorate(BookStore, {
    books: observable,
    loading: observable,
    query: observable,
    filteredBooks: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
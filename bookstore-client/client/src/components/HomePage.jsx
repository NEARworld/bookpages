import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Box, Container, styled, Grid, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Buffer } from "buffer";
import axiosInstance from "../utils/axios";
import Search from "./UI/Search";
import Select from "./UI/Select";
import BookCard from "./UI/BookCard";
import Loader from "./UI/Loader";
import useFetching from "./hooks/useFetching";
import "../styles/HomePage.css";

const Home = () => {
  // const books = [
  //   {
  //     id: 1,
  //     title: "The Alchemist",
  //     author: "Paulo Coelho",
  //     image:
  //       "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
  //     price: "12.99",
  //     rating: 4.5,
  //     description:
  //       '"The Alchemist" is a novel by Brazilian author Paulo Coelho. It is the story of Santiago, an Andalusian shepherd',
  //     published: "2006",
  //   },
  //   {
  //     id: 2,
  //     title: "A Game of Thrones",
  //     author: "George R.R. Martin",
  //     image:
  //       "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
  //     price: "12.99",
  //     rating: 4.5,
  //     description:
  //       '"A Game of Thrones" is the first novel in the series of fantasy novels',
  //     published: "2006",
  //   },
  //   {
  //     id: 3,
  //     title: "Quantum of Solace",
  //     author: "Neal Stephenson",
  //     image:
  //       "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
  //     price: "12.99",
  //     rating: 4.5,
  //     description:
  //       '"Quantum of Solace" is the second novel in the series of fantasy novels',
  //     published: "2006",
  //   },
  //   {
  //     id: 4,
  //     title: "The Name of the Wind",
  //     author: "Patrick Rothfuss",
  //     image:
  //       "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
  //     price: "12.99",
  //     rating: 4.5,
  //     description:
  //       '"The Name of the Wind" is the first novel in the series of fantasy novels',
  //     published: "2006",
  //   },
  //   {
  //     id: 5,
  //     title: "The Wise",
  //     author: "Patrick Rothfuss",
  //     image:
  //       "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
  //     price: "12.99",
  //     rating: 4.5,
  //     description:
  //       '"The Wise" is the first novel in the series of fantasy novels',
  //     published: "2006",
  //   },
  //   {
  //     id: 6,
  //     title: "principles",
  //     author: "Patrick Rothfuss",
  //     image:
  //       "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
  //     price: "12.99",
  //     rating: 4.5,
  //     description:
  //       '"principles" is the first novel in the series of fantasy novels',
  //     published: "2006",
  //   },
  // ];
  const [books, setBooks] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [found, setFound] = useState(false);
  const navigate = useNavigate();

  // returns -1
  const sortedBooks = useMemo(() => {
    console.log("selectedSort:", selectedSort);
    if (selectedSort) {
      return [...books].sort((a, b) => {
        console.log("a:", a[selectedSort].localeCompare(b[selectedSort]));
        return a[selectedSort].localeCompare(b[selectedSort]);
      });
    }
    return books;
  }, [selectedSort, books]);

  //
  const sortedAndSearchedBooks = useMemo(() => {
    return sortedBooks.filter((book) =>
      book.title.toLowerCase().includes(searchInput)
    );
  }, [searchInput, sortedBooks]);

  const [fetchBooks, err, showSuccess] = useFetching(async () => {
    await axiosInstance.get("/books/info").then((res) => {
      console.log(res.data);
      setFound(true);
      setBooks(
        res.data.map((book) => {
          return {
            ...book,
            picture: Buffer.from(book.picture, "base64").toString("base64"),
          };
        })
      );
    });
  });

  useEffect(() => {
    setFound(false);
    setTimeout(() => fetchBooks(), 1000);
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <Container
      maxWidth="xl"
      sx={{
        marginTop: "10px",
      }}
    >
      <Grid
        container
        sx={{
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
            />
          </FormControl>
          <Search searchInput={searchInput} setSearchInput={setSearchInput} />
        </Box>
        <Grid item xs={12} sx={{ marginTop: "10px" }}>
          <Item
            sx={{
              height: "100vh",
              width: "100%",
              backgroundColor: "transparent",
              backgroundImage: "none",
            }}
          >
            {books.length > 0 && found ? (
              <Box
                sx={{
                  display: "grid",
                  gap: 5,
                }}
                className="gallery-grid"
              >
                {searchInput
                  ? sortedAndSearchedBooks.map((item) => (
                      <BookCard
                        key={item._id}
                        item={item}
                        navigate={navigate}
                      />
                    ))
                  : selectedSort
                  ? sortedBooks.map((item) => (
                      <BookCard
                        key={item._id}
                        item={item}
                        navigate={navigate}
                      />
                    ))
                  : books.map((item) => (
                      <BookCard
                        key={item._id}
                        item={item}
                        navigate={navigate}
                      />
                    ))}
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  height: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h3" component="h1">
                  {found ? "No books found" : <Loader />}
                </Typography>
              </Box>
            )}
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;

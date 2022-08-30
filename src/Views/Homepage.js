import { React, useState, useEffect } from "react";
import List from "./../Components/List";

function Homepage() {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUserlist, setFilteredUserlist] = useState([]);
  const [sort, setSort] = useState(["ASC", "name"]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const json = await response.json();
      setUsers(json);
      setFilteredUserlist(json);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortHandler = (list) =>
    sort[0] === "ASC"
      ? list.sort((a, b) => {
          return a[sort[1]].localeCompare(b[sort[1]]);
        })
      : list.sort((a, b) => {
          return b[sort[1]].localeCompare(a[sort[1]]);
        });

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setSearchText(lowerCase);
  };

  const triggerSearch = () => {
    const filteredUsers = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchText) ||
        user.username.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText)
      );
    });

    setFilteredUserlist(filteredUsers);
  };

  return (
    <div className="">
      <h1>Hexis Test</h1>
      <div className="search">
        <input
          onChange={inputHandler}
          label="Search"
          placeholder="Please insert your search term "
        />
        <button onClick={triggerSearch}>SEARCH</button>
      </div>
      <List
        userlist={sortHandler(filteredUserlist)}
        onSort={(value) => {
          setSort(value);
        }}
        sort={sort}
      />
    </div>
  );
}

export default Homepage;

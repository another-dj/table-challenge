import React, { useState, useEffect } from "react";

function List({ userlist, onSort, sort }) {
  const [users, setUsers] = useState(userlist);

  useEffect(() => {
    const init = () => {
      setUsers(userlist);
    };

    init();
  }, [userlist]);

  const sortHandler = (value) => {
    if (sort[0] === "ASC") {
      onSort(["DESC", value]);
    } else {
      onSort(["ASC", value]);
    }
  };

  const sortHighlightStyle = (value) =>
    sort[1] === value
      ? { textDecoration: "underline" }
      : { textDecoration: "none" };

  const sortIcon = (value) => {
    const className =
      sort[1] === value
        ? sort[0] === "ASC"
          ? "fa-arrow-up"
          : "fa-arrow-down"
        : "";
    return className ? <i className={`fa-solid ${className}`} /> : null;
  };

  return (
    <ul className="userList">
      <li className="tableHead">
        <h4
          style={sortHighlightStyle("name")}
          onClick={() => sortHandler("name")}
        >
          Name {sortIcon("name")}
        </h4>
        <h4
          style={sortHighlightStyle("username")}
          onClick={() => sortHandler("username")}
        >
          User {sortIcon("username")}
        </h4>
        <h4>E-mail</h4>
      </li>
      {users.map((item) => (
        <li className="userRow" key={item.id}>
          <p>{item.name}</p>
          <p>{item.username}</p>
          <p>{item.email}</p>
        </li>
      ))}
    </ul>
  );
}

export default List;

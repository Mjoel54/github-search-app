// import React, { useState, useEffect } from "react";
import React, { useState } from "react";

import { searchGithubUser } from "../api/API";
// import { searchGithub, searchGithubUser } from "../api/API";

import { User } from "../interfaces/Candidate.interface";
import { UserList } from "../components/userList";

const CandidateSearch = () => {
  const [username, setUsername] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const fetchedUsers = await searchGithubUser(username);
      const mappedFetchedUsers = fetchedUsers.items;
      setUsers(mappedFetchedUsers);
      // console.log(users);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="h1 text-center my-4">Candidate Search</h1>

      <form onSubmit={onSearch} className="d-flex justify-content-center">
        <input
          type="text"
          value={username}
          onChange={onChange}
          placeholder="Search for a user"
          className="mx-2"
        />

        <button type="submit" className="mx-2">
          Search
        </button>
      </form>

      {loading && (
        <div className="d-flex justify-content-center mt-4">
          <div className="spinner-border text-light" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
      <UserList users={users} />
    </div>
  );
};

export default CandidateSearch;

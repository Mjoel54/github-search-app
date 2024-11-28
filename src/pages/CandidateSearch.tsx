// import React, { useState, useEffect } from "react";
import React, { useState } from "react";

import { searchGithubUser } from "../api/API";
// import { searchGithub, searchGithubUser } from "../api/API";

import { User } from "../interfaces/Candidate.interface";

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
      setUsers(fetchedUsers);
      console.log(users)
    } catch (err) {
      console.error(err);
    }
    setLoading(false);


  };

  return ( 
    <div>
      <form onSubmit={onSearch}>
        <input
          type="text"
          value={username}
          onChange={onChange}
          placeholder="Search for a user"
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default CandidateSearch;

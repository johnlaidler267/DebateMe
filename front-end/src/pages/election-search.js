import React from "react";

const Welcome = () => {
  return (
    <div>
      <h1>Welcome to the Election Search Page</h1>
    </div>
  );
};

// Create a search bar with a button to search for elections
const SearchBar = () => {
  return (
    <div>
      <form>
        <label>
          Search for an election:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

// Create a table to display the results of the search
const SearchResults = () => {
  return (
    <div>
      <table>
        <tr>
          <th>Election Name</th>
          <th>Election Date</th>
          <th>Election Type</th>
          <th>State</th>
          <th>County</th>
        </tr>
        <tr>
          <td>2020 Presidential Election</td>
          <td>November 3, 2020</td>
          <td>Presidential</td>
          <td>California</td>
          <td>San Diego</td>
        </tr>
      </table>
    </div>
  );
};

//create a function to display the search bar and results
const Contact = () => {
  return (
    <div>
      <Welcome />
      <SearchBar />
      <SearchResults />
    </div>
  );
};

export default Contact;

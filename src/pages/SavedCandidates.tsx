import { useEffect, useState } from "react";
import { User } from "../interfaces/Candidate.interface";
import { retrieveData } from "../components/dataStorage";
import { searchGithubUserName } from "../api/API";

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<User[]>([]);
  const [candidateData, setCandidateData] = useState<any[]>([]);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await retrieveData();
        setCandidates(data);

        // Fetch additional data for each candidate
        const candidateDetails = await Promise.all(
          data.map(async (candidate) => {
            try {
              const details = await searchGithubUserName(candidate.login);
              return { ...candidate, ...details };
            } catch (error) {
              console.error(`Error fetching data for candidate login: ${candidate.login}`, error);
              return { ...candidate, error: "Error fetching details" };
            }
          })
        );

        setCandidateData(candidateDetails);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  // Handle Reject Button Click
  const handleReject = (login: string) => {
    // Remove the candidate from localStorage
    const updatedCandidates = candidates.filter((candidate) => candidate.login !== login);
    localStorage.setItem("favourites", JSON.stringify(updatedCandidates));

    // Update the state to re-render the component
    setCandidates(updatedCandidates);
    setCandidateData(candidateData.filter((candidate) => candidate.login !== login));
  };

  return (
    <>
      <h1>Potential Candidates</h1>
      {candidateData.length > 0 ? (
        <table className="table-candidates">
          <thead>
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Location</th>
              <th className="p-4">Email</th>
              <th className="p-4">Company</th>
              <th className="p-4">Bio</th>
              <th className="p-4 text-center">Reject</th>
            </tr>
          </thead>
          <tbody>
            {candidateData.map((candidate, index) => (
              <tr key={index}>
                <td className="p-4">
                  <img
                    className="card-img-top rounded-circle"
                    src={candidate.avatar_url}
                    alt={candidate.login}
                    style={{ height: "3rem", width: "3rem" }}
                  />
                </td>
                <td className="p-4 text-break">{candidate.login}</td>
                <td className="p-4 text-break">{candidate.location || "Not provided"}</td>
                <td className="p-4 text-break">{candidate.email || "Not provided"}</td>
                <td className="p-4 text-break">{candidate.company || "Not provided"}</td>
                <td className="p-4 text-break">{candidate.bio || "Not provided"}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleReject(candidate.login)}
                    className="btn btn-danger rounded-circle"
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="d-flex justify-content-center mt-4">
          <div className="spinner-border text-light" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
    </>
  );
};

export default SavedCandidates;

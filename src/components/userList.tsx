import { User } from "../interfaces/Candidate.interface";
import { storeData } from "./dataStorage";

interface UserListProps {
  users: User[];
}

export const UserList: React.FC<UserListProps> = ({ users }) => {
  // console.log(users);
  return (
    <>
      {users.map((user) => (
        <div key={user.id}  className="card m-5">
          <img className="card-img-top" src={user.avatar_url} alt={user.login}/>
          <div className="card-body text-center">
            <a href={user.html_url} target="_blank">
            <h5 className="card-title">{user.login}</h5></a>
  
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p><div className="d-flex justify-content-center py-4">
            <button className="mx-3 btn btn-success rounded-circle" style={{ width: "4rem", height: "4rem", backgroundColor: "red", border: "1px solid red"}}>-</button>
            <button onClick={() => storeData(user)} className="mx-3 btn btn-success rounded-circle" style={{ width: "4rem", height: "4rem"}}>+</button>
            </div>
          </div>
        </div>
   ))}
    </>
  );
};

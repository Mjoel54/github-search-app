import { User } from "../interfaces/Candidate.interface";

interface UserListProps {
  users: User[];
}

export const UserList: React.FC<UserListProps> = ({ users }) => {
  console.log(users);
  return (
    <>



    
      {users.map((user) => (
        <div key={user.id}  className="card" style={{ width: "18rem;" }}>
          <img className="card-img-top" src={user.avatar_url} alt={user.login}/>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
   ))}
    </>
  );
};

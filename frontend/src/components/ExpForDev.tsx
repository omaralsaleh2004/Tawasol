import { useProfile } from "../context/Profile/ProfileContext";
import { formatDate } from "../utils";

const ExpForDev = () => {
  const { profile } = useProfile();

  return (
    <div className="section">
      <div className="header">
        <h3>Experience</h3>
      </div>
      <div className="content-box">
        {profile?.experience.map((e) => (
          <div key={e._id} className="content">
            <div className="content-date">
              <p>
                💼 {e.current ? "Works" : "Worked"} as
                <b> {e.title} </b> at
                <b> {e.company} </b>
              </p>
              <small>
                from {formatDate(e.from)} to{" "}
                {e.current ? "Current" : formatDate(e.to)}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpForDev;

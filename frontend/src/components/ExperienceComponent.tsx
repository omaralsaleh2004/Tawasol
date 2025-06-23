import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/Profile/ProfileContext";
import { formatDate } from "../utils";

const ExperienceComponent = () => {
  const { profile, deleteExperience } = useProfile();
  const navigate = useNavigate();

  const handleAddExperience = () => {
    navigate("/experience");
  };

  return (
    <div className="section">
      <div className="header">
        <h3>Experience</h3>
        <button onClick={handleAddExperience}>➕</button>
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
            {deleteExperience !== undefined ? (
              <button
                className="del-btn"
                onClick={() => deleteExperience(e._id)}
              >
                x
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceComponent;

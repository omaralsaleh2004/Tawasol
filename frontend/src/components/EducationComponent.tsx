import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/Profile/ProfileContext";
import { formatDate } from "../utils";

const EducationComponent = () => {
  const { profile, deleteEducation } = useProfile();
  const navigate = useNavigate();

  const handleAddEducation = () => {
    navigate("/education");
  };
  return (
    <div className="section">
      <div className="header">
        <h3>Education</h3>
        <button onClick={handleAddEducation}>➕</button>
      </div>
      <div className="content-box">
        {profile?.education.map((e) => (
          <div key={e._id} className="content">
            <div className="content-date">
              <p>
                &#127891; {e.current ? "Studeies" : "Studied"}{" "}
                <b>
                  {e.degree} of{" "}
                  <b>
                    {e.fieldofstudy} at <b>{e.school}</b>
                  </b>
                </b>
              </p>
              <small>
                from {formatDate(e.from)} to{" "}
                {e.current ? "Current" : formatDate(e.to)}
              </small>
            </div>
            {deleteEducation !== undefined ? (
              <button
                className="del-btn"
                onClick={() => deleteEducation(e._id)}
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

export default EducationComponent;

import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/Profile/ProfileContext";
import { formatDate } from "../utils";
import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
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
        <Button onClick={handleAddExperience}>
          <AddIcon />
        </Button>
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
              <Button onClick={() => deleteExperience(e._id)}>
                <Delete />
              </Button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceComponent;

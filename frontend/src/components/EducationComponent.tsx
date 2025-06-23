import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/Profile/ProfileContext";
import { formatDate } from "../utils";
import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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
        <Button onClick={handleAddEducation}>
          <AddIcon />
        </Button>
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
              <Button onClick={() => deleteEducation(e._id)}>
                <Delete />
              </Button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationComponent;

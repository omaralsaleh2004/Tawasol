import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useProfile } from "../../context/Profile/ProfileContext";
import { useNavigate } from "react-router-dom";

const EducationForm = () => {
  const { profile, addEducation, fetchProfile } = useProfile();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const schoolRef = useRef<HTMLSelectElement | null>(null);
  const degreeRef = useRef<HTMLInputElement | null>(null);
  const fieldOfStudyRef = useRef<HTMLInputElement | null>(null);
  const fromRef = useRef<HTMLInputElement | null>(null);
  const currentRef = useRef<HTMLInputElement | null>(null);
  const toRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    console.log("From useEffect");
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    navigate("/home");
  };

  const handleSubmit = async () => {
    const school = schoolRef.current?.value;
    const degree = degreeRef.current?.value;
    const from = fromRef.current?.valueAsDate;
    const fieldofstudy = fieldOfStudyRef.current?.value ?? "";
    const current = currentRef.current?.checked ?? false;
    const to = toRef.current?.valueAsDate ?? null;

    if (!profile) {
      setError("There is no profile for this user");
      navigate("/create-profile");
      return;
    }
    if (!school || !degree || !from) {
      setError("Check if you have enterd School and Degree and From Date");
      return;
    }

    if (from && to) {
      if (from > to) {
        setError("Check from and to if you have enter it correctly");
        return;
      }
    }
    addEducation({ current, degree, fieldofstudy, from, school, to });
    navigate("/home");
    setError("");
  };

  console.log("Profile ++++ ", profile);
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Typography variant="h5">Add Education</Typography>
        <Box
          sx={{
            minWidth: "35%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 0.5,
            border: 1,
            p: 4,
            borderColor: "#f5f5f5",
          }}
        >
          <TextField label="School" name="school" inputRef={schoolRef} />
          <TextField label="Degree" name="degree" inputRef={degreeRef} />
          <TextField
            label="Field of Study"
            name="fieldofstudy"
            inputRef={fieldOfStudyRef}
          />
          <TextField type="date" name="from" inputRef={fromRef} />
          <TextField
            type="checkbox"
            label="Current School"
            name="current"
            inputRef={currentRef}
          />
          <TextField type="date" name="to" inputRef={toRef} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              pt: 6,
            }}
          >
            {" "}
            <Box sx={{ display: "flex", alignItems: "center", gap: "80px" }}>
              <Button
                style={{ width: "50%" }}
                onClick={handleSubmit}
                variant="contained"
              >
                Submit
              </Button>
              <Button
                style={{ width: "50%" }}
                onClick={handleBack}
                variant="contained"
              >
                Back
              </Button>
            </Box>
            {error ? (
              <Typography sx={{ color: "red" }}>{error}</Typography>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EducationForm;

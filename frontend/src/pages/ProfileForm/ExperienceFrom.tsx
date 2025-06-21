import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useProfile } from "../../context/Profile/ProfileContext";
import { useNavigate } from "react-router-dom";

const ExperienceForm = () => {
  const { profile, addExperience, fetchProfile } = useProfile();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const titleRef = useRef<HTMLSelectElement | null>(null);
  const companyRef = useRef<HTMLInputElement | null>(null);
  const fromRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);
  const currentRef = useRef<HTMLInputElement | null>(null);
  const toRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    console.log("From useEffect");
    fetchProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    const title = titleRef.current?.value;
    const company = companyRef.current?.value;
    const from = fromRef.current?.valueAsDate ?? null;
    const location = locationRef.current?.value ?? "";
    const current = currentRef.current?.checked ?? false;
    const to = toRef.current?.valueAsDate ?? null;

    if (!profile) {
      setError("There is no profile for this user");
      navigate("/create-profile");
      return;
    }
    if (!title || !company || !from) {
      setError("Check if you have enterd JobTitle and Company and From Date");
      return;
    }

    if (from && to) {
      if (from > to) {
        setError("Check from and to if you have enter it correctly");
        return;
      }
    }
    setError("");

    addExperience({
      title,
      company,
      from,
      location,
      current,
      to,
    });
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
        <Typography variant="h5">Add Experience</Typography>
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
          <TextField label="Job Title" name="title" inputRef={titleRef} />
          <TextField label="Company" name="company" inputRef={companyRef} />
          <TextField label="Loacation" name="location" inputRef={locationRef} />
          <TextField type="date" name="from" inputRef={fromRef} />
          <TextField
            type="checkbox"
            label="Current Job"
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
            <Button
              onClick={handleSubmit}
              variant="contained"
              style={{ width: "100%" }}
            >
              Submit
            </Button>
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

export default ExperienceForm;

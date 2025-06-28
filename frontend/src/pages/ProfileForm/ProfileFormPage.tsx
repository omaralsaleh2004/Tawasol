import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useProfile } from "../../context/Profile/ProfileContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/User/UserContext";
import defaultImage from "../../assests/default.png";
const ProfileFormPage = () => {
  const { createProfile, profile, uploadProfileImage } = useProfile();
  const { getUser, updateImageVersion } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const statusRef = useRef<HTMLSelectElement | null>(null);
  const companyRef = useRef<HTMLInputElement | null>(null);
  const websiteRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);
  const countryRef = useRef<HTMLInputElement | null>(null);
  const skillsRef = useRef<HTMLInputElement | null>(null);
  const bioRef = useRef<HTMLInputElement | null>(null);

  const [preview, setPreview] = useState(defaultImage);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // update preview to new image
    }
  };

  const handleSubmit = async () => {
    const status = statusRef.current?.value;
    const company = companyRef.current?.value ?? "";
    const website = websiteRef.current?.value ?? "";
    const location = locationRef.current?.value ?? "";
    const country = countryRef.current?.value ?? "";
    const skills = skillsRef.current?.value;
    const bio = bioRef.current?.value ?? "";

    if (!status || !skills) {
      console.log("check skills or status");
      setError("check skills or status");
      return;
    }
    setError("");
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      await uploadProfileImage(formData);
      updateImageVersion();
    }
    createProfile(company, website, country, location, status, skills, bio);
    navigate("/home");
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Typography variant="h5">Edit Profile</Typography>
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
          <FormControl fullWidth>
            <InputLabel id="role-label">Select Profissional Status</InputLabel>

            <Select
              labelId="role-label"
              id="role"
              name="status"
              label="Role"
              inputRef={statusRef}
            >
              <MenuItem value="Developer">Developer</MenuItem>
              <MenuItem value="Junior Developer">Junior Developer</MenuItem>
              <MenuItem value="Senior Developer">Senior Developer</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Instructor">Instructor</MenuItem>
              <MenuItem value="Intern">Intern</MenuItem>
            </Select>
          </FormControl>
          <input
            placeholder="Enter Profile image"
            type="file"
            onChange={onFileChange}
            src={preview}
          />
          <TextField label="Company" name="company" inputRef={companyRef} />
          <TextField label="Website" name="website" inputRef={websiteRef} />
          <TextField label="Loacation" name="location" inputRef={locationRef} />
          <TextField label="Country" name="country" inputRef={countryRef} />
          <TextField label="Skills" name="skills" inputRef={skillsRef} />
          <TextField label="Bio" name="bio" inputRef={bioRef} />
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

export default ProfileFormPage;

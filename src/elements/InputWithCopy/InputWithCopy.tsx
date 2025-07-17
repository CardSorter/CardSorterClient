import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import React from "react";
import styles from "./InputWithCopy.module.scss";
import copyToClipboard from "../../utils/copyToClipboard";

interface InputWithCopyProps {
  title?: string,
  inputText: string,
}

export default function InputWithCopy({inputText, title}: InputWithCopyProps) {

  const onCopy = () => {
    copyToClipboard(inputText);
  }

  return (
    <div className={styles.shareContainer}>
      {
        title &&
          <h3>{title}</h3>
      }

      <FormControl variant="outlined" className={styles.input}>
        <InputLabel htmlFor="outlined-adornment-password">Share URL</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          value={inputText}
          disabled
          fullWidth
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Copy link"
                onClick={onCopy}
                edge="end"
              >
                <span className="material-symbols-outlined">content_copy</span>
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
    </div>
  )
}
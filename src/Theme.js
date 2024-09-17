const generateThemeOptions = (appTheme) => {
  const mode = appTheme.mode || "light";
  const primaryColor = "#00308F";
  const secondaryColor = "#F0F5FF";
  const backgroundColor = mode === "light" ? "#ffffff" : "#010101";

  return {
    typography: {
      overflow: "hidden",
      fontFamily: ["montserrat"],
      body1: {
        noWrap: true,
        fontWeight: 400,
        textOverflow: "ellipsis",
      },
      body2: {
        noWrap: true,
        fontWeight: 400,
        textOverflow: "ellipsis",
      },
    },
    palette: {
      mode,
      borderColor: {
        main: "##ccc",
      },
      activeBlue: {
        main: "#1677FF",
      },
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
      background: {
        default: backgroundColor,
      },
    },

    components: {
      MuiMenuItem: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            overflow: "hidden",
          },
        },
      },
      MuiIconButton: {
        defaultProps: {
          disableFocusRipple: true,
          disableTouchRipple: true,
        },
      },
      MuiButton: {
        defaultProps: {
          size: "small",
          disableRipple: true,
          variant: "contained",
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: "capitalize",
            "&.MuiButton-containedSecondary:hover": {
              backgroundColor: "#d4d4da",
            },
            "&.MuiTypography-root": {
              fontWeight: 500,
              fontSize: "14px",
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            border: "none",
            outline: "none",
            "&.MuiInputBase-root:placeholder": {
              fontSize: "13px",
            },
            "&.MuiInputBase-root:hover": {
              border: `1px solid #00000010`,
            },
            "&.MuiInputBase-root:focus": {
              border: 0,
              outline: "none",
            },
            "&.MuiInputBase-root:focusVisible": {
              border: 0,
              outline: "none",
            },
            "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
              border: `1px solid #00000010`,
            },
            "&.MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: `1px solid ${primaryColor}`,
              },
            "&.MuiInputBase-root.Mui-focused:hover .MuiOutlinedInput-notchedOutline":
              {
                border: `1px solid ${primaryColor}`,
              },
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: "#dadada",

            "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
              backgroundColor: "#dadada",
            },

            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
              {
                backgroundColor: "#A7A7A7",
              },

            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
              {
                backgroundColor: "#A7A7A7",
              },

            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
              {
                backgroundColor: "#A7A7A7",
              },

            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
              backgroundColor: "#dadada",
            },

            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 8,

              backgroundColor: "#A7A7A7",

              border: "3px solid #A7A7A7",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            border: "none",
            outline: "none",
            "& .MuiFormHelperText-root": {
              margin: "6px 0px",
            },
            "& .MuiInputBase-root": {
              fontSize: "14px",
            },
            "& .MuiInputBase-root.Mui-disabled": {
              border: "none",
            },
            "& .MuiInputBase-root::placeholder": {
              fontSize: "14px",
            },
            "& .MuiInputBase-root:focus": {
              border: 0,
              outline: "none",
            },
            "& .Mui-disabled:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiInputBase-root:focus-visible": {
              border: 0,
              outline: "none",
            },
            "& .MuiInputBase-root.Mui-disabled .MuiInputAdornment-root": {
              color: "#00000010",
            },
            "& .MuiInputBase-root .MuiOutlinedInput-notchedOutline": {
              border: `1px solid #ccc`,
            },
            "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
              border: `1px solid ${primaryColor}`,
            },
            "& .MuiInputBase-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
              {
                border: "1px solid #ccc",
              },
            "& .MuiInputBase-root.Mui-disabled:hover .MuiOutlinedInput-notchedOutline":
              {
                border: "1px solid #ccc",
              },

            "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: `1px solid ${primaryColor}`,
              },
          },
        },
      },
    },
  };
};

export default generateThemeOptions;


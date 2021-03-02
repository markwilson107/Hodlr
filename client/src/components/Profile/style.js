export default (theme) => {
    return {
        root: {
            position: "relative",
            backgroundColor: "white",
            height: "100%",
            margin: "20px 0px 20px 0px"
        },
        toolbar: {
            height: "26px",
            backgroundColor: theme.background.main,
            textAlign: "center",
            paddingTop: "6px",
            marginBottom: "20px"
        },
        yellow: {
            color: theme.palette.primary.yellow
        },
        colorSwatch: {
            backgroundColor: theme.palette.primary.yellow,
            height: 48,
            width: 48,
            borderRadius: "50%",
            marginLeft: `auto`,
            marginRight: `auto`,
            cursor: "pointer"
        }
    }
};

export default (theme) => {
    return {
        root: {
            position: "relative",
            backgroundColor: "white",
        },
        toolbar: {
            borderBottom: "0px solid black",
            backgroundColor: theme.background.main
        },
        star: {
            position: "absolute",
            top: 4,
            right: 4,
            cursor: "pointer"
        },
        yellow: {
            color: theme.palette.primary.yellow
        }
    }
};

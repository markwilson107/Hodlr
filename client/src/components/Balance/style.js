export default (theme) => {
    return {
        root: {
            position: "relative",
            backgroundColor: theme.background.dark,
            height: 400
        },
        toolbar: {
            borderBottom: "0px solid black",
            backgroundColor: theme.background.main
        },
        yellow: {
            color: theme.palette.primary.yellow
        }
    }
};

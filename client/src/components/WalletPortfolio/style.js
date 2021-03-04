export default (theme) => {
    return {
        root: {
            position: "relative",
            backgroundColor:"white" ,
            height: "400px",
            overflowY: "auto",
            overflowX: "hidden"
        },
        toolbar: {
            height: "26px",
            backgroundColor: theme.background.main,
            textAlign: "center",
            paddingTop: "6px"
        },
        add: {
            position: "absolute",
            top: 6,
            right: 6,
            zIndex: 10
        },
        red: {
            backgroundColor:  "white"
        }
    }
};

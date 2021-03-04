export default (theme) => {
    return {
        root: {
            position: "relative",
            backgroundColor: "white",
            maxHeight: "480px",
            overflowY: "auto",
            margin: "20px 0px 0px 0px",
            scrollbarColor: "light"
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
        addTransaction: {
            textAlign: "center",
            padding: "20px 0px 20px 0px"
        },
        transactionMenu: {
            textAlign: "center"
        },
        input: {
            width: "100%",
            maxWidth:"400px"
        }
    }
};
